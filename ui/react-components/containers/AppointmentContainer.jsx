import React, {Component} from "react";
import AddAppointment from "../components/AddAppointment/AddAppointment.jsx";
import {IntlProvider} from "react-intl";
import {getLocale} from "../utils/LocalStorageUtil";
import translations from '../../i18n/appointments';
import PropTypes from "prop-types";
import {AppContext} from "../components/AppContext/AppContext";
import {getAppConfig, getMessages} from "../components/AppContext/AppService";
import EditAppointment from "../components/EditAppointment/EditAppointment.jsx";
import moment from "moment";

// TODO : need to add connection to redux

class AppointmentContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locale: getLocale() === 'pt_BR' ? 'pt-BR': getLocale(),
            messages: translations[props.locale],
            appConfig: null
        };
        (async () => {
            this.setState({messages: await getMessages(getLocale())});
            this.setState({appConfig: await getAppConfig()});
        })();
        moment.locale(getLocale() === 'pt_BR' ? 'pt-BR': getLocale());
    }

    render() {
        const {locale, messages, appConfig} = this.state;
        const {appointmentUuid,isRecurring, setViewDate, onBack, appointmentParams, currentProvider, urlParams} = this.props;
        return (
            <AppContext.Provider value={{onBack: onBack, setViewDate: setViewDate}}>
                <IntlProvider defaultLocale='en' locale={locale} messages={messages}>
                    {appointmentUuid
                        ? <EditAppointment appConfig={appConfig} appointmentUuid={appointmentUuid} isRecurring={isRecurring}  currentProvider={currentProvider}/>
                        : <AddAppointment appConfig={appConfig} appointmentParams={appointmentParams} currentProvider={currentProvider} urlParams={urlParams}/>}
                </IntlProvider>
            </AppContext.Provider>);
    }
}

AppointmentContainer .propTypes = {
    onBack: PropTypes.func.isRequired,
    appointmentUuid: PropTypes.string,
    isRecurring: PropTypes.string,
    setViewDate: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    isCancel: PropTypes.bool,
    appointmentParams: PropTypes.object,
    currentProvider: PropTypes.object,
    urlParams: PropTypes.object
};

export default AppointmentContainer;
