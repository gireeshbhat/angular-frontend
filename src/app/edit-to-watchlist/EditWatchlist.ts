
export class EditWatchlist {

    constructor(
      public GateKeeperID: number,
      public LastName: string,
      public FirstName: string,
      public MiddleName: string,
      public Name: string,
      public AkAName: string,
      public Status: string,
      public Notes: string,
      public RequestBy: string,
      public DateAdded: string,
      public IsIndividual: boolean,
      public IsUpdate: boolean,
      public Watchlist_NPI: Npi[],
      public Watchlist_PhoneNumber: PhoneNumber[],
      public Watchlist_License: License[],
      public Watchlist_ProviderNo: ProviderNo[],
      public Address: Address[],
    ) { }
  }

  export class Address {
    constructor(
      public Id: number,
      public AddressLine1: string,
      public AddressLine2: string,
      public City: string,
      public State: string,
      public ZipCode: string,
    ) {};
  }

  export class Npi {
    constructor(
      public Id: number,
      public Npi: string
    ) {};
  }

  export class PhoneNumber {
    constructor(
      public Id: number,
      public PhoneNumber: string
    ) {};
  }

  export class License {
    constructor(
      public Id: number,
      public License: string
    ) {};
  }

  export class ProviderNo {
    constructor(
      public Id: number,
      public ProviderNo: string
    ) {};
  }
