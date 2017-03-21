$(function(){
	var siderbarbtn=$("#siderbar-btn"),
	siderbar=$("#siderbar"),
	mask=$(".mask");
	siderbarbtn.on('click',function(){
		mask.fadeIn();
		siderbar.animate({'right':'0px'});
	});
	mask.on('click',function(){
		mask.fadeOut();
		siderbar.animate({'right':'-300px'});
	});
	$(".backtotop").on('click',function(){
		$('html body').animate({
			scrollTop:0
		},800)
	});
	$(window).on('scroll',function(){
		if($(window).scrollTop()>$(window).height()){
			$(".backtotop").fadeIn();
		}else{
			$(".backtotop").fadeOut();
		}
	});
	$(window).trigger("scroll");
})
