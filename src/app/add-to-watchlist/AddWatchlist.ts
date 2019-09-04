
export class AddWatchlist {

    constructor(
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
      public Watchlist_NPI: string[],
      public Watchlist_PhoneNumber: string[],
      public Watchlist_License: string[],
      public Watchlist_ProviderNo: string[],
      public Address: Address[],
    ) { }
  }

  export class Address {
    constructor(
      public AddressLine1: string,
      public AddressLine2: string,
      public City: string,
      public State: string,
      public ZipCode: string,
    ) {};
  }

