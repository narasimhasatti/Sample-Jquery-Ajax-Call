var productList;
$(document)
		.ready(
				function() {

					$
							.ajax({
								url : 'assets/js/productData.json',
								type : 'GET',
								dataType : 'json',
								success : function(data) {

									var prodData = data.productList.length;

									productList = data.productList;
									/* Code for adding widgets (Product Details) */
									for (var i = 0; i < prodData; i++) {

										$(".product")
												.append(
														'<div class="col-md-3 col-sm-4 col-xs-12   nopadding-LR"><div class="widget-space border-style"><div class="col-md-12 col-sm-12 col-xs-6 img-center"><img class="img-position" src='
																+ data.productList[i].imageUrls.md
																+ '  alt="'
																+ data.productList[i].brand
																+ '" height="100px" width="100px"/></div><div class="col-md-12 col-sm-12 col-xs-6"><div class="prod-desc">'
																+ data.productList[i].description
																+ '</div><div class="prod-price">$'
																+ data.productList[i].networkPrice
																+ '</div><div class="view"><button class="btn btn-block btn-primary view-click" onclick="productDetails('
																+ data.productList[i].productId
																+ ')"  onmouseover="productDetails('
																+ data.productList[i].productId
																+ ')">View More</button></div></div><div class="clearfix"></div></div>');
										/*
										 * Code for getting ... after specific
										 * string count
										 */
										$(".prod-desc")
												.each(
														function() {
															if ($(this).text().length > 60)
																$(this)
																		.text(
																				$(
																						this)
																						.text()
																						.substring(
																								0,
																								60)
																						+ '...');
														});

									}

									productDetails(data.productList[0].productId);
								},
								error : function(error, status) {

									console.log(error);

								}

							});

				});
/* Function for adding Product details to header module */
function productDetails(productId) {

	var results = $
			.map(
					productList,
					function(e, i) {

						if (e.productId === productId) {
							var str = '';
							var bulletLength = e.marketingBullets.length;
							$.each(e.marketingBullets, function(ind, val) {
								str = str + '<li>' + val + '</li>';
							})
							$('.product-details')
									.html(
											'<div class="brand-margin"><div class="col-lg-3 col-md-3 col-xs-12 brand"><img src="'
													+ e.imageUrls.md
													+ '" width="195px" height="195px;" /></div><div class="col-lg-6 col-md-6 col-xs-12"><h4 class="header-text">'
													+ e.description
													+ '</h4><ul>'
													+ str
													+ '</ul></div><div class="col-lg-3 col-md-3 col-xs-12 view"><div class="prodprice-header">$'
													+ e.networkPrice
													+ '</div><button class="btn btn-primary btn-block" id="addToCart" onClick="getPrice('
													+ e.networkPrice
													+ ')">ADD TO CART</button></div><div class="clearfix"></div></div>');

						}

					});
}
/* function for getting alert box on click of Add to Cart button */
function getPrice(price) {
	$(".product-details")
			.append(
					'<div class="alert alert-info alert-pos" role="alert">  <a href="#" class="close" data-dismiss="alert">&times;</a>Cart Value:'
							+ price + '</div>');

}
