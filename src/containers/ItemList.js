import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, {
  Pagination, Navigation,
} from 'swiper/core';

import { fetchAllItems } from '../redux/actions/index';
import itemlist from '../styles/itemlist.module.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

SwiperCore.use([Pagination, Navigation]);

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  fetchAllItems: PropTypes.func.isRequired,
};

const defaultProps = { items: [] };

const ItemList = ({ items, fetchAllItems }) => {
  useEffect(() => {
    if (items.length === 0) fetchAllItems();
  }, []);
  return (
    <div className={itemlist.cont}>
      <div className={itemlist.top}>
        <FontAwesomeIcon icon={faBars} color="#a1a0a1" />
        <span className={itemlist.title}>Items</span>
      </div>
      <div>
        <Swiper centeredSlides spaceBetween={30} pagination={{ type: 'fraction' }} navigation className={itemlist.swiper}>
          {items.map((i) => (
            <SwiperSlide key={i.id} className={itemlist.slide}>
              <div className={itemlist.cardWrapper}>
                <div className="card w-100">
                  <img src={i.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{i.title}</h5>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

ItemList.propTypes = propTypes;
ItemList.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  if (state.items === undefined) {
    return { items: [] };
  }
  return { items: state.items };
};

const mapDispatchToProps = {
  fetchAllItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
