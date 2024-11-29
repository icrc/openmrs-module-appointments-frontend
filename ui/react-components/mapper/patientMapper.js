export const getPatientName = (patient) => {
     return [patient.givenName, patient.middleName, patient.familyName]
        .filter(Boolean)
        .join(' ');
};

export const getPatientForDropdown = patient => {
    const {identifier, uuid} = patient;
    const name = patient.name || getPatientName(patient);
    return {
        value: {name, identifier, uuid},
        label: `${name} (${patient.identifier})`
    };
};

export const mapOpenMRSPatient = patient => {
    const displays = patient.display.split(" - ");
    const name = displays[1];
    const identifier = displays[0];
    const uuid = patient.uuid;
    return {
        value: {name, identifier, uuid},
        label: `${name} (${identifier})`
    };
};
