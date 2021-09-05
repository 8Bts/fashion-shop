import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import desktop from '../styles/desktop.module.css';

const DesktopPage = () => (
  <div>
    <div className={desktop.container}>
      <div className="m">
        <FontAwesomeIcon icon={faWindowClose} size="8x" color="#dc3545" />
      </div>
      <div className={desktop.content}>
        <h1 className="text-center lh-lg my-5">
          Sorry...
          <br />
          Desktop version is not supported
        </h1>
        <div className={`${desktop.info} p-5 rounded-3`}>
          You can still use this web application by:
          <ul className="text-start my-4">
            <li><span>Resizing your window to a lower width</span></li>
            <li>
              <span>
                Using a device emulator of your browser (press F12 and then click on
                <FontAwesomeIcon className="mx-2" icon={faMobileAlt} size="1x" color="#545252" />
                icon)
                <strong> - Recommended</strong>
              </span>
            </li>
          </ul>
          Make sure that view width is
          {' '}
          <strong className="mx-1"><i>less than 768px</i></strong>
          {' '}
          and then simply reload the page!
        </div>
      </div>
    </div>
  </div>
);

export default DesktopPage;
