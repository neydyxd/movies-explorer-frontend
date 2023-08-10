import back from '../../images/back.svg'
import './Promo.css'
function Promo() {
    return(
        <section className="promo">
            <div className='promo__container'>
                <img className="promo__image" src={back} alt="картинка бэкграунда" />
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            </div>
        </section>
    );
}
export default Promo;