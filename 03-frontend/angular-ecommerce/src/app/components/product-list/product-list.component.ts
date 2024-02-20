import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = '';
  products: Product[] = [];
  searchMode: boolean = false;

  // properties for pagination
  pageNumber: number = 1;
  thePageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = "";
  

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }
  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword than previous then set pageNumber to 1
    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = keyword;

    console.log(`keyword=${keyword}, pageNumber=${this.pageNumber}`);

    // now search for products using keyword
    this.productService.searchProductListPaginate(this.pageNumber - 1, this.thePageSize, keyword).subscribe(this.processResult());

  }

  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string and convert it to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      // not category id available ... default to category id = 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    // Check if we have a different category id than previous
    // if we have a different category id than previous set the pageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.pageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    )
  }
  updatedPageSize(value: string) {
    this.thePageSize = +value;
    this.pageNumber = 1;
    this.listProducts();
  }
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }
}
