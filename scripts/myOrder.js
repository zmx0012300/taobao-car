$(document).ready(function() {
    // 1.1"我的淘宝"二级菜单的隐藏与显示
    $(".nav_myTao").hover(function(){
        $(this).find(".nav-myTao-nav").show();
    },function(){
        $(this).find(".nav-myTao-nav").hide();
    });

    // 1.2"收藏夹"二级菜单的隐藏与显示
    $(".nav_collection").hover(function() {
        $(this).find(".nav-myTao-nav").show();
    },function() {
        $(this).find(".nav-myTao-nav").hide();
    });

    // 1.3"卖家中心"的二级菜单的隐藏与显示
    $(".nav_sellCenter").hover(function() {
        $(this).find(".nav-myTao-nav").show();
    },function(){
        $(this).find(".nav-myTao-nav").hide();
    });

    // 1.4"联系客服"的二级菜单的隐藏与显示
    $(".nav_contact").hover(function() {
        $(this).find(".nav-myTao-nav").show();
    },function(){
        $(this).find(".nav-myTao-nav").hide();
    });

    // 2下边框的移动
    $(".btn-switch-cart").mouseenter(function() {
        $(".btn-switch-cart").removeClass('selectColumn');
        $(this).addClass('selectColumn');
    }).mouseleave(function() {
        $(".btn-switch-cart").removeClass('selectColumn');
        $(".switch-cart-0").addClass('selectColumn');
    });

    // 3.买家促销的显示与隐藏
    $('body').on("mouseenter",".promotion",function() {
        $(this).siblings('.proSlidedown').show();
    })
    $('body').on("mouseleave",".promotion",function() {
        $(this).siblings(".proSlidedown").hide();
    })
    
    // 商品输入框的输入效果
    $("body").on("input onpropertychange keypress change",".item-amount input",function(e) {
    // console.log(111);
    // 获取input输入框的值
    var text = $(this).val();
    // 获取显示单个商品的总价格的span
    var tdSum = $(this).parents('.td-amount').siblings('.td-sum').find('span');
    // 获取最大能够输入的数量
    var maxCount = Number($(this).parent('.item-amount').siblings('.stock').text());
    // 获取单个商品的单价
    var price = Number($(this).parents('.td-amount').siblings('.td-price').find('span').text());
    // 监听键盘事件，只能按数字键才会有效
        if(e.type=='keypress') {
            var keyCode = e.keyCode ? e.keyCode : e.charCode ;
			if (keyCode !== 0 && (keyCode <48 || keyCode >57) && keyCode!==8 && keyCode !==37 && keyCode !==39 && keyCode !==46) {
				return false;
			} else {
				return true;
			};
        } 
    tdSum.text(price*text + ".00");
    if(text>maxCount) {
        $(this).val(maxCount);
        tdSum.text(price*maxCount+ ".00");
        $(this).parent('.item-amount').siblings('.outNum').show();
        $(this).parent('.item-amount').siblings('.outNum').find('.stockNum').text(maxCount);

    }
    else if(text<=0) {
        $(this).val(1);
        tdSum.text(price+ ".00");
        $(this).parent('.item-amount').siblings('.outNum').hide(); 
    }
    else{
        $(this).parent('.item-amount').siblings('.outNum').hide();
    }
    })

    // 3.点击加号实现数量的增加，最多只能加到574,然后价格随着数量的增加发生改变
    $("body").on("click",".amount-right",function() {
        
            // 3，先实现数量的增加
            // 获取最多能够加到的数量，这是一个字符串，要将他转换为数字类型
            var stop = Number($(this).parent('.item-amount').siblings('.stock').text());
            // 获取input框的值
            var num = $(this).parent('.item-amount').find('input').val();
            // 获取商品的单价
            var price = Number( $(this).parents('.td-amount').siblings('.td-price').find('span').text());
            $(this).css({"cursor":"pointer"}) 
            if(num<stop) {
                num++;
                $(this).siblings('input').val(num);
                
            }
            else {
                // 已经加到最大数量,显示提示框
                $(this).parent('.item-amount').siblings('.outNum').show();
                $(this).parent('.item-amount').siblings('.outNum').find('.stockNum').text(stop);
                $(this).siblings('input').val(stop);
                $(this).parents('.td-amount').siblings('.td-sum').find('span').text(price*stop + '.00');
            }
             //实现价格的改变
            $(this).parents('.td-amount').siblings('.td-sum').find('span').text(price*num + '.00');
            getCountPrice();

    });

    // 4.点击减号实现数量的递减，减到0就不能再减了，价格也会发生变化

    $("body").on("click",".amount-left",function() {
        //先实现数量的递减
        // 获取input框的值
        var num = $(this).parent('.item-amount').find('input').val();
        // 获取最多能够加到的数量，这是一个字符串，要将他转换为数字类型
        var stop = Number($(this).parent('.item-amount').siblings('.stock').text());
        // 获取商品的单价
        var price = Number( $(this).parents('.td-amount').siblings('.td-price').find('span').text());
        
            num--;
            $(this).siblings('input').val(num);
            $(this).parents('.td-amount').siblings('.td-sum').find('span').text(price*num + '.00');
            if(num<stop) {
              $(this).parent(".item-amount").siblings('.outNum').hide();  
            }
            if(num<1) {
            $(this).siblings('input').val(1);
            $(this).parents('.td-amount').siblings('.td-sum').find('span').text(price + '.00');
        }
        getCountPrice();
    });
    // 5.1点击单个的店铺全选效果
    $("body").on("click",".shopInfo input",function() {
        var inputs = $('.shopInfo input');
        // 让上面的全选按钮根据店铺的选中状态选择选中状态。
        $('.shopInfo input').size() == $('.shopInfo input:checked').size()? $('.allSelected1').prop('checked',true): $('.allSelected1').prop('checked',false);
        // 下面的全选按钮跟上面的全选按钮的状态保持一致
        $('.allSelected1').prop('checked')?$('.allSelected2').prop('checked',true):$('.allSelected2').prop('checked',false);
            var status = $(this).prop("checked");
            // console.log(status);
            // 控制别的复选框
            $(this).parents('.shopInfo').siblings('.commodityInfo').find('.td-inner input').prop("checked",status);
            if(status==true) {
                $(this).parents('.shopInfo').siblings('.commodityInfo').css({
                    'background-color':'#fff8e1'
                });
                 // 上面的结算按钮的状态为可以点击
                $('.cart-sum a').css({'cursor':'pointer','background-color':'rgb(255,68,0)'});
                 // 下面的结算按钮
                $('.btn-area a').css({'cursor':'pointer','background-color':'rgb(255,68,0)'});
            }
            else {
                $(this).parents('.shopInfo').siblings('.commodityInfo').css({
                    'background-color':'#fcfcfc'
                });
                $('.cart-sum a').css({'cursor':'not-allowed','background-color':'rgb(170,170,170)'});
                $('.btn-area a').css({'cursor':'not-allowed','background-color':'rgb(170,170,170)'});
            }
            getCountPrice();
    })

    // 5.2点击单个商品的选中状态
    $("body").on("click",".td-inner input",function() {
        var status = $(this).prop("checked");
        $(this).parents('.commodityInfo').siblings('.shopInfo').find('input').prop("checked",status);
        if(status) {
            $(this).parents('.commodityInfo').css({'background':'#fff8e1'});
            // 上面的结算按钮的状态为可以点击
            $('.cart-sum a').css({'cursor':'pointer','background-color':'rgb(255,68,0)'});
            // 下面的结算按钮
            $('.btn-area a').css({'cursor':'pointer','background-color':'rgb(255,68,0)'});
            getCountPrice();
        }
        else {
            $(this).parents('.commodityInfo').css({'background':'#fcfcfc'});
            $('.cart-sum a').css({'cursor':'not-allowed','background-color':'rgb(170,170,170)'});
            $('.btn-area a').css({'cursor':'not-allowed','background-color':'rgb(170,170,170)'});
            getCountPrice(); 
        }
        var inputs = $('.shopInfo input');
        // 让上面的全选按钮根据店铺的选中状态选择选中状态。
        $('.shopInfo input').size() == $('.shopInfo input:checked').size()? $('.allSelected1').prop('checked',true): $('.allSelected1').prop('checked',false);
        // 下面的全选按钮跟上面的全选按钮的状态保持一致
        $('.allSelected1').prop('checked')?$('.allSelected2').prop('checked',true):$('.allSelected2').prop('checked',false);

        
    })

    //全选函数
    function allSelected() {
        if ($(this).prop('checked')) {
			$(':checkbox').prop('checked',true);
			$('.commodityInfo').css({
				'background-color':'#FFF8E1'
			});
			$('.submit-btn').css({
				'background-color':'#f40',
				'cursor':'pointer'
			});
			$('#btn-sum').css({
				'background-color':'#f40',
				'cursor':'pointer'
            });
            getCountPrice();
		} else {
			$(':checkbox').prop('checked',false);
			$('.commodityInfo').css({
				'background-color':'#fcfcfc'
			});
			$('.submit-btn').css({
				'background-color':'#aaa',
				'cursor':'not-allowed'
			})
			$('#btn-sum').css({
				'background-color':'#aaa',
				'cursor':'not-allowed'
            })
            getCountPrice();
        }
        
    }
    
    // 计算商品的结算时候的价格
    function getCountPrice() {
        var sum = 0;
        // var l = 0;
        $.each($('.td-inner input'),function(i,e) {
            // console.log($(e).prop('checked'))
            if($(e).prop("checked")) {
                 sum+=Number($(e).parents('.td-chk').siblings('.td-sum').find('span').text());
                //  console.log(sum)
            }
        })
        $(".total-symbol").text(sum+'.00');
        $(".total-sum").text(sum+'.00');
        // console.log(l);
    }
    // 上面的全选按钮
	$('.selectAll').on('click', '.allSelected1',allSelected);

    // 下面的全选按钮
    $("body").on("click",'.allSelected2',allSelected);
});