export class PickupCaseRequest {

    constructor(
    public userId: string,
    public viewType: string,
    public limit: number) {
        userId = '';
        viewType = 'cases';
        limit = 5;
    }
}
