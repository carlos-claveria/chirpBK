export interface LoraBK {
    url             : string;
    netVersion      : string;
    networkServers  : NetworkServer[];
    organization    : Organization;
    users           : User[];
    serviceProfiles : ServiceProfile;
    deviceProfiles  : DeviceProfile[];
    gateways        : Gateway[]; 
    devices         : Device[];
    DevicesKeys     : DeviceKeys[];
}

export interface NetworkServer {
    id: string;
    name: string;
    server: string;
    caCert: string;
    tlsCert: string;
    tlsKey: string;
    routingProfileCACert: string;
    routingProfileTLSCert: string;
    routingProfileTLSKey: string;
    gatewayDiscoveryEnabled: boolean;
    gatewayDiscoveryInterval: number;
    gatewayDiscoveryTXFrequency: number;
    gatewayDiscoveryDR: number;
}


export interface Organization {
    id: string;
    name: string;
    displayName: string;
    canHaveGateways: boolean;
    maxGatewayCount: number;
    maxDeviceCount: number;
}

export interface User {
    id: string;
    sessionTTL: number;
    isAdmin: boolean;
    isActive: boolean;
    email: string;
    note: string;
}

export interface ServiceProfile {
    id: string;
    name: string;
    organizationID: string;
    networkServerID: string;
    ulRate: number;
    ulBucketSize: number;
    ulRatePolicy: string;
    dlRate: number;
    dlBucketSize: number;
    dlRatePolicy: string;
    addGWMetaData: boolean;
    devStatusReqFreq: number;
    reportDevStatusBattery: boolean;
    reportDevStatusMargin: boolean;
    drMin: number;
    drMax: number;
    channelMask?: string | null;
    prAllowed: boolean;
    hrAllowed: boolean;
    raAllowed: boolean;
    nwkGeoLoc: boolean;
    targetPER: number;
    minGWDiversity: number;
}

export interface Tags {}
export interface Metadata {}
export interface Boards {}
export interface Variables {}
export interface Integration {
    kind : string;
}

export interface DeviceProfile {
    id: string;
    name: string;
    organizationID: string;
    networkServerID: string;
    supportsClassB: boolean;
    classBTimeout: number;
    pingSlotPeriod: number;
    pingSlotDR: number;
    pingSlotFreq: number;
    supportsClassC: boolean;
    classCTimeout: number;
    macVersion: string;
    regParamsRevision: string;
    rxDelay1: number;
    rxDROffset1: number;
    rxDataRate2: number;
    rxFreq2: number;
    factoryPresetFreqs: any[];
    maxEIRP: number;
    maxDutyCycle: number;
    supportsJoin: boolean;
    rfRegion: string;
    supports32BitFCnt: boolean;
    payloadCodec: string;
    payloadEncoderScript: string;
    payloadDecoderScript: string;
    geolocBufferTTL: number;
    geolocMinBufferSize: number;
    tags: Tags;
    uplinkInterval: string;
}

export interface Location {
    latitude: number;
    longitude: number;
    altitude: number;
    source: string;
    accuracy: number;
}

export interface Gateway {
    id: string;
    name: string;
    description: string;
    location: Location;
    organizationID: string;
    discoveryEnabled: boolean;
    networkServerID: string;
    gatewayProfileID: string;
    boards: Boards[];
    tags: Tags;
    metadata: Metadata;
}

export interface HttpIntegration {
    applicationID: string;
    headers: any[];
    uplinkDataURL: string;
    joinNotificationURL: string;
    ackNotificationURL: string;
    errorNotificationURL: string;
    statusNotificationURL: string;
    locationNotificationURL: string;
    txAckNotificationURL: string;
    integrationNotificationURL: string;
    marshaler: string;
    eventEndpointURL: string;
}

export interface Application {
    id: string;
    name: string;
    description: string;
    organizationID: string;
    serviceProfileID: string;
    payloadCodec: string;
    payloadEncoderScript: string;
    payloadDecoderScript: string;
    integrations?       : Integration[];
    httpIntegration?    : HttpIntegration;
}

export interface Device {
    devEUI: string;
    name: string;
    applicationID: string;
    description: string;
    deviceProfileID: string;
    skipFCntCheck: boolean;
    referenceAltitude: number;
    variables: Variables;
    tags: Tags;
    isDisabled: boolean;
}

export interface DeviceKeys {
    devEUI: string;
    nwkKey: string;
    appKey: string;
    genAppKey: string;
}
