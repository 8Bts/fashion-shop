import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from 'bootstrap/js/dist/modal';
import Toast from 'bootstrap/js/dist/toast';
import singleItem from '../styles/singleitem.module.css';
import {
  fetchItem,
  setSingleItem,
  logUser,
  fetchAllItems,
  fetchAllCategories,
} from '../redux/actions/index';
import API from '../api';

const propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.object),
    img_public_id: PropTypes.string,
  }),
  categories: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  fetchItem: PropTypes.func.isRequired,
  fetchAllItems: PropTypes.func.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  setSingleItem: PropTypes.func.isRequired,
  logUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    admin_level: PropTypes.number,
    favourites: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const defaultProps = {
  item: {
    title: '',
    price: '',
    image: '',
    img_delete_token: '',
    categories: [
      { name: '' },
    ],
  },
  categories: [],
};

const ItemPage = ({
  item,
  match,
  fetchItem, fetchAllCategories, fetchAllItems, logUser, setSingleItem,
  currentUser, categories,
}) => {
  const history = useHistory();

  const [formFlash, setFormFlash] = useState();
  const [toastFlash, setToastFlash] = useState();
  const [editItemModal, initEditItemModal] = useState();
  const [verifyModal, initVerifyModal] = useState();
  const [toast, initToast] = useState();
  const [isFavourite,
    setIfFavourite] = useState(currentUser.favourites.some(
    (f) => f.id === Number(match.params.id),
  ));

  useEffect(() => {
    fetchItem(match.params.id);

    if (categories.length === 0) fetchAllCategories();
    return () => setSingleItem({});
  }, []);

  useEffect(() => {
    if (toastFlash) {
      toast.show();
    }
  }, [item]);

  useEffect(() => {
    if (!item.title) return;

    const editItemModalEl = document.querySelector('#editItemModal');
    const verifyModalEl = document.querySelector('#verifyModal');

    editItemModalEl.addEventListener('hidden.bs.modal', () => {
      document.getElementById('editItemForm').reset();
      document.getElementById('titleInput').classList.remove('is-invalid');
    });

    initVerifyModal(new Modal(verifyModalEl, {
      keyboard: false,
    }));

    initEditItemModal(new Modal(editItemModalEl, {
      keyboard: false,
    }));
    initToast(new Toast(document.querySelector('#toastSuccess'), {
      keyboard: false,
    }));
  }, [item]);

  const handleFavourite = async () => {
    const spinner = document.getElementById('favSpinner');
    spinner.classList.remove('d-none');
    if (isFavourite) {
      await API.users.removeFavourite(currentUser.id, match.params.id);
    } else {
      await API.users.addFavourite(currentUser.id, match.params.id);
    }
    API.users.get(currentUser.id).then((res) => {
      logUser(res);
    }).finally(() => spinner.classList.add('d-none'));

    setIfFavourite(!isFavourite);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const spinner = document.getElementById('publishSpinner');
    spinner.classList.remove('d-none');
    const file = document.querySelector('[type=file]').files[0];
    const title = document.querySelector('#titleInput').value;
    const price = document.querySelector('#priceInput').value;
    const category = document.querySelector('#categoryInput').value;

    if (file) {
      API.cloudinary.upload(file).then((res) => {
        API.items.update(
          item.id, title, price, res.url, category, res.public_id,
        ).then((response) => {
          if (response.message) throw response;
          editItemModal.hide();
          setToastFlash('Item successfully was updated!');
          fetchAllItems();
          fetchAllCategories();
          fetchItem(item.id);
        }).catch((error) => {
          API.cloudinary.destroy(res.delete_token);
          document.querySelector('#titleInput').classList.add('is-invalid');
          setFormFlash(error.message);
        });
      }).finally(() => spinner.classList.add('d-none'));
    } else {
      API.items.update(
        item.id, title, price, item.image, category, item.img_public_id,
      ).then((response) => {
        if (response.message) throw response;
        editItemModal.hide();
        setToastFlash('Item successfully was updated!');
        fetchAllItems();
        fetchAllCategories();
        fetchItem(item.id);
      }).catch((error) => {
        document.querySelector('#titleInput').classList.add('is-invalid');
        setFormFlash(error.message);
      }).finally(() => spinner.classList.add('d-none'));
    }
  };

  const handleDelete = async () => {
    const spinner = document.getElementById('verifySpinner');
    spinner.classList.remove('d-none');

    await API.items.drop(item.id);
    await fetchAllItems();
    API.users.get(currentUser.id).then((res) => {
      logUser(res);
    }).finally(() => spinner.classList.add('d-none'));
    verifyModal.hide();
    history.goBack();
  };

  return (
    <div className="h-100">
      <div className={singleItem.cont}>
        { item.title ? (
          <div>
            <div className={singleItem.top}>
              <FontAwesomeIcon onClick={() => history.goBack()} icon={faChevronLeft} size="1x" color="#545252" />
              <h5 className={singleItem.title}>{item.title}</h5>
            </div>
            <div className={singleItem.itemCard}>
              <div className={singleItem.cardImageBg} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.39) 98.35%), url(${item.image})` }}>
                { currentUser.admin_level > 0 ? (
                  <div className={singleItem.aControl}>
                    <FontAwesomeIcon onClick={() => editItemModal.show()} className="me-4" title="Edit" icon={faEdit} size="lg" color="#fff" />
                    <FontAwesomeIcon title="Delete" icon={faTrashAlt} size="lg" color="#dc3545" data-bs-toggle="modal" data-bs-target="#verifyModal" />
                  </div>
                ) : ''}
                <div className={singleItem.details}>
                  <span className="badge bg-dark">{item.categories[0].name}</span>
                  <span className={singleItem.cardPrice}>{`$ ${item.price}`}</span>
                </div>
              </div>
              <div className={singleItem.cardBody}>
                <p>You can add this item to your favourites list by clicking the button below.</p>
              </div>
              <button onClick={handleFavourite} type="button" className={`${singleItem.addButton} ${isFavourite ? singleItem.isFavourite : ''}`}>
                <span id="favSpinner" className="d-none spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                { isFavourite ? 'Unlist from favourites' : 'Add to favourites' }
              </button>
            </div>
            <div className="modal fade" id="editItemModal" data-bs-backdrop="static" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Item</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>
                  <div className="modal-body">
                    <form id="editItemForm" onSubmit={handleEditSubmit}>
                      <label htmlFor="titleInput" className="d-block mb-3">
                        Title:
                        <input id="titleInput" type="text" className="form-control mt-2" defaultValue={item.title} required />
                        <div className="invalid-feedback">{formFlash}</div>
                      </label>
                      <label htmlFor="categoryInput" className="d-block mb-3">
                        Category:
                        <select id="categoryInput" className="form-select mt-2" defaultValue={item.categories[0].name}>
                          {categories.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label htmlFor="priceInput" className="d-block mb-3">
                        Price:
                        <input id="priceInput" type="number" className="form-control mt-2" defaultValue={item.price} required />
                      </label>
                      <label htmlFor="imageInput" className="d-block mb-3">
                        Image:
                        <input id="imageInput" type="file" className="form-control mt-2" accept="image/png, image/jpeg" />
                      </label>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" form="editItemForm" className="btn btn-primary">
                      <span id="publishSpinner" className="d-none spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal fade" id="verifyModal" tabIndex="-1" aria-labelledby="verifyModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="verifyModalLabel">Confirmation</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>
                  <div className="modal-body">
                    Are you sure to delete this item?
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={handleDelete} type="button" className="btn btn-danger">
                      <span id="verifySpinner" className="d-none spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`toast w-100 ${singleItem.toast}`} id="toastSuccess" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="d-flex">
                <div className="toast-body text-center w-100">
                  {toastFlash}
                </div>
                <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
              </div>
            </div>
          </div>
        ) : (
          <div className={singleItem.loading}>
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary mx-1" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ItemPage.propTypes = propTypes;
ItemPage.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  item: state.singleItem,
  categories: state.categories,
});

const mapDispatchToProps = ({
  fetchItem,
  setSingleItem,
  logUser,
  fetchAllItems,
  fetchAllCategories,
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
