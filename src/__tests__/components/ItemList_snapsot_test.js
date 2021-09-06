import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ItemList from '../../containers/ItemList';
import store from '../../redux/store';

configure({ adapter: new Adapter() });
it('Renders correctly', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <BrowserRouter>
        <ItemList />
      </BrowserRouter>
    </Provider>,
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
