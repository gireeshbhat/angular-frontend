import * as _ from 'underscore';


export class PagerService {

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 11, pagerSize?: number) {

        // calculate total pages

        const totalPages = Math.ceil(totalItems / pageSize);

        let tPage: number;

        let cPage: number;

        let sPage: number;

        let ePage: number;

        let mPage: number;

        if (pagerSize !== undefined) {

            tPage = pagerSize;

            cPage = 3;

            sPage = 2;

            ePage = 2;

            mPage = 4;

        } else {

            tPage = 10;

            cPage = 6;

            sPage = 5;

            ePage = 4;

            mPage = 9;

        }

        let startPage: number, endPage: number;

        if (totalPages <= tPage) {

            // less than 10 total pages so show all

            startPage = 1;

            endPage = totalPages;

        } else {

            // more than 10 total pages so calculate start and end pages

            if (currentPage <= cPage) {

                startPage = 1;

                endPage = tPage;

            } else if (currentPage + ePage >= totalPages) {

                startPage = totalPages - mPage;

                endPage = totalPages;

            } else {

                startPage = currentPage - sPage;

                endPage = currentPage + ePage;

            }

        }





        // calculate start and end item indexes

        const startIndex = (currentPage - 1) * pageSize;

        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);


        // create an array of pages to ng-repeat in the pager control

        const pages = _.range(startPage, endPage + 1);



        // return object with all pager properties required by the view

        return {

            totalItems: totalItems,

            currentPage: currentPage,

            pageSize: pageSize,

            totalPages: totalPages,

            startPage: startPage,

            endPage: endPage,

            startIndex: startIndex,

            endIndex: endIndex,

            pages: pages

        };

    }

}
