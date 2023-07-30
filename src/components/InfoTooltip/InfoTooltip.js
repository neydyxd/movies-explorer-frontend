import './InfoTooltip.css';
import useEscapePress from '../../hooks/useEscapePress.jsx';

function InfoTooltip() {
  return (
    <div
      className='info-tooltip'
      
    >
      <div className="info-tooltip__container">
        <div
          className='info-tooltip__status'
        ></div>
        <h2 className="info-tooltip__title"></h2>
        <button
          type="button"
          className="info-tooltip__close-button"
          
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;