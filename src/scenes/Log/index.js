import React from 'react'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import Overlay from '../../components/Overlay'
import { translate, Interpolate, Trans } from 'react-i18next'
import { connect } from 'react-redux'
import i18n from '../../services/language/i18n'
import { toggleMenu, changeLng } from '../../services/users/actions.js'
import classnames from 'classnames'

import 'slick-carousel';
import 'slick-carousel/slick/slick.css'

import srcHome from '../../boilerplate/assets/img/icons/24x24/home-white.svg'
import srcMenu from '../../boilerplate/assets/img/icons/24x24/menu-white.svg'
import srcHistory from '../../boilerplate/assets/img/icons/64x64/history.svg'

@translate(['log', 'home'], { wait: true })

class Log extends React.Component {

    carousel() {
        const $carousel = $('#history-checkin')
        if($carousel.length > 0) {
            $carousel.slick({
                dots: false,
                infinite: true,
                speed: 100,
                arrows: false,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                cssEase: 'ease-in'
            });
        }
    }

    componentDidMount() {
        this.carousel()
    }

    render() {
        const { t, toggleMenu, user } = { ...this.props }
        return (
            <div className={classnames('wrapper page-history', { 'is-show': user.isMenu })}>
                <Header toggleMenu={toggleMenu} isMenu={user.isMenu} srcHome={srcHome} srcMenu={srcMenu} />
                <div className="container">
                    <div className="history-page section-page">
                        <div className="history-logo"><img src={srcHistory} width="64" height="64" alt={t('common:history')}/></div>
                        <h2 className="history-title">{t('common:history')}</h2>
                        <p className="history-desc">{t('home:history_desc')}</p>
                        <div className="history-container">
                            <div className="history-checkin" id="history-checkin">
                                <div className="history-list">
                                    <div className="history-header">
                                        <div className="history-day">Today</div>
                                        <div className="history-date">07/09/2017 </div>
                                    </div>
                                    <ul className="history-content">
                                        <li>
                                            <div className="item-time">08:30</div>
                                            <div className="item-name">Codeshore</div>
                                        </li>
                                        <li>
                                            <div className="item-time">09:00</div>
                                            <div className="item-name">SS-Global</div>
                                        </li>
                                        <li>
                                            <div className="item-time">09:45</div>
                                            <div className="item-name">BackOffice</div>
                                        </li>
                                        <li>
                                            <div className="item-time">11:29</div>
                                            <div className="item-name">Metting room</div>
                                        </li>
                                        <li>
                                            <div className="item-time">11:58</div>
                                            <div className="item-name">Codeshore</div>
                                        </li>
                                        <li>
                                            <div className="item-time">12:40</div>
                                            <div className="item-name">Divison 1                        </div>
                                        </li>
                                        <li>
                                            <div className="item-time">16:33</div>
                                            <div className="item-name">SS-Global  </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="history-list">
                                    <div className="history-header">
                                        <div className="history-day">Yesterday</div>
                                        <div className="history-date">07/09/2017</div>
                                    </div>
                                    <ul className="history-content">
                                        <li>
                                            <div className="item-time">08:30</div>
                                            <div className="item-name">Codeshore</div>
                                        </li>
                                        <li>
                                            <div className="item-time">09:00</div>
                                            <div className="item-name">SS-Global</div>
                                        </li>
                                        <li>
                                            <div className="item-time">09:45</div>
                                            <div className="item-name">BackOffice</div>
                                        </li>
                                        <li>
                                            <div className="item-time">11:29</div>
                                            <div className="item-name">Metting room</div>
                                        </li>
                                        <li>
                                            <div className="item-time">11:58</div>
                                            <div className="item-name">Codeshore</div>
                                        </li>
                                        <li>
                                            <div className="item-time">12:40</div>
                                            <div className="item-name">Divison 1 </div>
                                        </li>
                                        <li>
                                            <div className="item-time">16:33</div>
                                            <div className="item-name">SS-Global  </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="history-list">
                                    <div className="history-header">
                                        <div className="history-day">Friday</div>
                                        <div className="history-date">07/09/2017</div>
                                    </div>
                                    <ul className="history-content">
                                        <li>
                                            <div className="item-time">08:30</div>
                                            <div className="item-name">Codeshore</div>
                                        </li>
                                        <li>
                                            <div className="item-time">09:00</div>
                                            <div className="item-name">SS-Global</div>
                                        </li>
                                        <li>
                                            <div className="item-time">09:45</div>
                                            <div className="item-name">BackOffice</div>
                                        </li>
                                        <li>
                                            <div className="item-time">11:29</div>
                                            <div className="item-name">Metting room</div>
                                        </li>
                                        <li>
                                            <div className="item-time">11:58</div>
                                            <div className="item-name">Codeshore</div>
                                        </li>
                                        <li>
                                            <div className="item-time">12:40</div>
                                            <div className="item-name">Divison 1</div>
                                        </li>
                                        <li>
                                            <div className="item-time">16:33</div>
                                            <div className="item-name">SS-Global</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Overlay toggleMenu={toggleMenu} isMenu={user.isMenu} />
                <Navigation t={t} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: status => {
            dispatch(toggleMenu(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)