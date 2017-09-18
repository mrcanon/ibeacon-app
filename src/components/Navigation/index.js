import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MenuLInk from './components/MenuLink'
import srcSetting from '../../boilerplate/assets/img/icons/24x24/setting.svg'
import srcGroup from '../../boilerplate/assets/img/icons/24x24/user-group2.svg'
import { translate } from 'react-i18next';

@translate(['nav'], { wait: true })

class Navigation extends React.Component {
    
    render() {
        const { t } = { ...this.props }
        return (
            <div className="splitter">
                <div className="splitter-profile">
                    <div className="splitter-media"></div>
                    <div className="splitter-name">Nguyễn Văn Thực</div>
                </div>
                <ul className="splitter-menu">
                    <MenuLInk to="setting" src={srcSetting} label={t('common:setting')} />
                    <MenuLInk to="about" src={srcGroup} label={t('common:about')} />
                </ul>
            </div>
        )
    }
}

Navigation.propTypes = {
    t: PropTypes.func.isRequired
}

export default Navigation