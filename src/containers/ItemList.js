import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faStar } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import Modal from 'bootstrap/js/dist/modal';
import Toast from 'bootstrap/js/dist/toast';
import { Link } from 'react-router-dom';
import {
  fetchAllItems, fetchAllCategories, setItems, setCategory, setCursor,
} from '../redux/actions/index';
import itemlist from '../styles/itemlist.module.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import API from '../api';

SwiperCore.use([Pagination]);

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  fetchAllItems: PropTypes.func.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  setItems: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  setCursor: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  cursor: PropTypes.number.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    admin_level: PropTypes.number,
    favourites: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const defaultProps = {
  items: [],
  categories: [],
};

const ItemList = ({
  items, categories, currentUser, filter, cursor,
  setItems, fetchAllItems, fetchAllCategories, setCategory, setCursor,
}) => {
  const sideBar = document.querySelector(`.${itemlist.sidenav}`);
  const content = document.querySelector(`.${itemlist.content}`);
  const swiper = document.querySelector(`.${itemlist.swiper}`);

  const [swiperInstance, setSwiperInstance] = useState();
  const [newItemModal, initNewItemModal] = useState();
  const [newCategoryModal, initNewCategoryModal] = useState();
  const [toast, initToast] = useState();
  const [toastFlash, setToastFlash] = useState();
  const [formFlash, setFormFlash] = useState();
  const [loading, setLoading] = useState(true);
  const [swiperTranslate, setInitTranslate] = useState();
  const [menuIsOpen, setMenuState] = useState();

  const adjustBars = (translate) => {
    const bars = document.querySelector(`.${itemlist.top}`);
    bars.style.paddingLeft = `${translate}px`;
  };

  useEffect(() => {
    const newItemModalEl = document.querySelector('#newItemModal');
    const newCategoryModalEl = document.querySelector('#newCategoryModal');
    newItemModalEl.addEventListener('hidden.bs.modal', () => {
      document.getElementById('newItemForm').reset();
      document.getElementById('titleInput').classList.remove('is-invalid');
    });
    newCategoryModalEl.addEventListener('hidden.bs.modal', () => {
      document.getElementById('newCategoryForm').reset();
      document.getElementById('nameInput').classList.remove('is-invalid');
    });

    initNewItemModal(new Modal(newItemModalEl, {
      keyboard: false,
    }));
    initNewCategoryModal(new Modal(newCategoryModalEl, {
      keyboard: false,
    }));
    initToast(new Toast(document.querySelector('#toastSuccess'), {
      keyboard: false,
    }));

    if (items.length === 0) {
      setTimeout(() => setLoading(false), 20000);
      fetchAllItems();
      fetchAllCategories();
    }
  }, []);

  useEffect(() => {
    if (toastFlash) {
      toast.show();
      if (toastFlash === 'New item successfully was added!') swiperInstance.slideTo(items.length);
    }
  }, [items, categories]);

  useEffect(() => {
    if (items.length === 0 && swiperInstance) swiperInstance.disable();
    if (items.length > 0) {
      setLoading(false);
    }
    if (swiperInstance) {
      swiperInstance.enable();
      setTimeout(() => {
        swiperInstance.update();
      }, 300);
    }
  }, [items]);

  useEffect(() => {
    if (swiperInstance) {
      if (swiperInstance.translate > 0) setInitTranslate(swiperInstance.translate);
      swiperInstance.update();
      if (swiperTranslate > 0) adjustBars(swiperTranslate);
      else adjustBars(swiperInstance.translate);
    }
  });

  const closeMenu = () => {
    setMenuState(false);
    const links = document.querySelectorAll('.card-link');
    links.forEach((link) => link.classList.remove(itemlist.cardLink));

    sideBar.style.width = '0';
    sideBar.style.paddingLeft = '0';
    content.style.boxShadow = null;
    content.style.marginTop = null;
    swiper.style.height = null;
    setTimeout(() => swiperInstance.update(), 300);
  };

  const openMenu = () => {
    setMenuState(true);
    const links = document.querySelectorAll('.card-link');
    links.forEach((link) => link.classList.add(itemlist.cardLink));

    swiperInstance.allowSlidePrev = false;
    swiperInstance.once('sliderMove', () => {
      swiperInstance.allowSlidePrev = true;
      closeMenu();
    });
    sideBar.style.width = '60%';
    sideBar.style.paddingLeft = '2.5em';
    content.style.boxShadow = '0 0 24px #939393';
    content.style.marginTop = '1.5em';
    swiper.style.height = '82vh';
  };

  const handleItemSubmit = (event) => {
    event.preventDefault();
    const spinner = document.getElementById('publishSpinner');
    spinner.classList.remove('d-none');
    const file = document.querySelector('[type=file]').files[0];
    API.cloudinary.upload(file).then((res) => {
      const title = document.querySelector('#titleInput').value;
      const price = document.querySelector('#priceInput').value;
      const category = document.querySelector('#categoryInput').value;

      API.items.create(title, price, res.url, category, res.public_id).then((response) => {
        if (response.message) throw response;
        newItemModal.hide();
        closeMenu();
        setToastFlash('New item successfully was added!');
        fetchAllItems();
        fetchAllCategories();
      }).catch((error) => {
        API.cloudinary.destroy(res.delete_token);
        document.querySelector('#titleInput').classList.add('is-invalid');
        setFormFlash(error.message);
      });
    }).catch().finally(() => spinner.classList.add('d-none'));
  };

  const handleCategorySubmit = (event) => {
    event.preventDefault();
    const spinner = document.getElementById('addSpinner');
    spinner.classList.remove('d-none');

    const name = document.querySelector('#nameInput').value;
    API.categories.create(name).then((res) => {
      if (res.message) throw res;
      newCategoryModal.hide();
      setToastFlash('New Category successfully was added!');
      fetchAllCategories();
    }).catch((error) => {
      document.querySelector('#nameInput').classList.add('is-invalid');
      setFormFlash(error.message);
    }).finally(() => spinner.classList.add('d-none'));
  };

  const handleFilter = (event, items) => {
    const prevBtn = Array.from(document.getElementsByName(filter))[0];
    prevBtn.style = null;
    const btn = event.target;
    setCategory(btn.innerText);
    closeMenu();
    swiperInstance.allowSlidePrev = true;
    swiperInstance.off('sliderMove');
    swiperInstance.slideTo(0, 1, false);
    if (items) setItems(items);
    else fetchAllItems();
  };

  useEffect(() => {
    const btn = Array.from(document.getElementsByName(filter))[0];
    btn.style.color = 'var(--btn-bg-color)';
  }, [filter]);

  const handleLogout = () => {
    window.localStorage.removeItem('currentUser');
    window.location.replace('/');
  };
  return (
    <div className={itemlist.cont}>
      <div className={itemlist.sidenav}>
        <div>
          <span className={itemlist.avatar}>{currentUser.name[0]}</span>
          <span className={itemlist.username}>{currentUser.name}</span>
        </div>
        { currentUser.admin_level > 0 ? (
          <div className={itemlist.adminPanel}>
            <h5 className={itemlist.apLabel}>Admin Panel</h5>
            <button className={`${itemlist.apButton} ${itemlist.sideButton}`} type="button" data-bs-toggle="modal" data-bs-target="#newItemModal">Add new item</button>
            <button className={`${itemlist.apButton} ${itemlist.sideButton}`} type="button" data-bs-toggle="modal" data-bs-target="#newCategoryModal">Add new category</button>
          </div>
        ) : ''}
        <div className={itemlist.categories}>
          <button id="allItemsBtn" name="All" className={itemlist.sideButton} type="button" onClick={(event) => handleFilter(event)}>All</button>
          { categories.map((c) => (
            <button key={c.id} name={c.name} onClick={(event) => handleFilter(event, c.items)} className={itemlist.sideButton} type="button">{c.name}</button>
          ))}
        </div>
        <div>
          <button className={itemlist.sideButton} name="Favourites" type="button" onClick={(event) => handleFilter(event, currentUser.favourites)}>
            Favourites
            <FontAwesomeIcon className="ms-2" icon={faStar} color="#daa520" />
          </button>
          <br />
          <button type="button" className={`${itemlist.sideButton} ${itemlist.logout}`} onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className={itemlist.content}>
        <div className={itemlist.top}>
          <FontAwesomeIcon onClick={menuIsOpen ? closeMenu : openMenu} icon={faBars} color="#a1a0a1" />
          <span className={itemlist.title}>Items</span>
        </div>
        <div id="">
          <Swiper
            centeredSlides
            slidesPerView="auto"
            spaceBetween={30}
            pagination={{ type: 'fraction', el: `.${itemlist.pagination}` }}
            className={itemlist.swiper}
            onSlideChange={(swiper) => {
              setCursor(swiper.activeIndex);
            }}
            onBeforeInit={(swiper) => {
              setSwiperInstance(swiper);
            }}
            onAfterInit={(swiper) => {
              adjustBars(swiper.translate);
              setInitTranslate(swiper.translate);
              swiper.slideTo(cursor, 0, false);
            }}
          >
            { items.length === 0 ? (
              <SwiperSlide>
                {loading ? (
                  <div className={itemlist.loading}>
                    <div className="spinner-grow spinner-grow-sm text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm text-secondary mx-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className={`${itemlist.vw100} h-75 d-flex flex-column align-items-center justify-content-center`}>
                    <div className="text-center">
                      <FontAwesomeIcon className="mb-4" onClick={openMenu} icon={faTimesCircle} size="6x" color="#d9d9d98f" />
                      <h5>No Items yet</h5>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ) : ''}
            {items.map((i) => (
              <SwiperSlide key={i.id} className={itemlist.slide}>
                <div className={itemlist.cardWrapper}>
                  <div className="card w-100">
                    <Link className="card-link" to={`/item/${i.id}`}>
                      <div className={itemlist.image} style={{ backgroundImage: `url(${i.image})` }} />
                    </Link>
                    <div className={`card-body ${itemlist.cardBody}`}>
                      <div className={itemlist.cardInfo}>
                        <Link to={`/item/${i.id}`} className={`${itemlist.titleLink} card-link`}>
                          <h5 className={`${itemlist.cardTitle} card-title`}>{i.title}</h5>
                        </Link>
                        <span className={itemlist.cardPrice}>{`$ ${i.price}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className={itemlist.pagination} />
          </Swiper>

        </div>
      </div>
      <div className={`${itemlist.modal} modal fade`} id="newItemModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="newItemModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newItemModalLabel">Add new Item</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form id="newItemForm" onSubmit={handleItemSubmit}>
                <label htmlFor="titleInput" className="d-block mb-3">
                  Title:
                  <input id="titleInput" type="text" className="form-control mt-2" required />
                  <div className="invalid-feedback">{formFlash}</div>
                </label>
                <label htmlFor="categoryInput" className="d-block mb-3">
                  Category:
                  <select id="categoryInput" className="form-select mt-2">
                    {categories.map((c) => (
                      <option key={c.id}>{c.name}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="priceInput" className="d-block mb-3">
                  Price:
                  <input id="priceInput" type="number" className="form-control mt-2" required />
                </label>
                <label htmlFor="imageInput" className="d-block mb-3">
                  Image:
                  <input id="imageInput" type="file" className="form-control mt-2" accept="image/png, image/jpeg" required />
                </label>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" form="newItemForm" className="btn btn-primary">
                <span id="publishSpinner" className="d-none spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${itemlist.modal} modal fade`} id="newCategoryModal" data-bs-backdrop="static" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new Category</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form id="newCategoryForm" onSubmit={handleCategorySubmit}>
                <label htmlFor="nameInput" className="d-block mb-3">
                  Name:
                  <input id="nameInput" type="text" className="form-control mt-2" required />
                  <div className="invalid-feedback">{formFlash}</div>
                </label>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" form="newCategoryForm" className="btn btn-primary">
                <span id="addSpinner" className="d-none spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`toast w-100 ${itemlist.toast}`} id="toastSuccess" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body text-center w-100">
            {toastFlash}
          </div>
          <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
        </div>
      </div>
    </div>
  );
};

ItemList.propTypes = propTypes;
ItemList.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  if (state.items === undefined || state.categories === undefined) {
    return {
      items: [],
      categories: [],
    };
  }
  return {
    items: state.items,
    categories: state.categories,
    filter: state.filter,
    cursor: state.cursor,
  };
};

const mapDispatchToProps = {
  fetchAllItems,
  fetchAllCategories,
  setItems,
  setCategory,
  setCursor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
