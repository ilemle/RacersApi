export interface Racer {
    dateOfBirth: string,
    driverId: string,
    familyName: string,
    givenName: string,
    nationality: string,
    url: string,
    code: string,
}

export interface RacerCircuits {
    Location: {
        country: string,
        lat: string,
        locality: string,
        long: string,
    },
    circuitId: string,
    circuitName: string,
    url: string
}

export interface RacerCircuitShortedData {
    circuitName: string,
    locality: string,
    country: string,
    url: string,
}