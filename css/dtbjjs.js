if((/iphone|android|windows phone/.test(navigator.userAgent.toLowerCase())) && (location.href.indexOf('pc=1')<0)){
    if(location.href.indexOf('wow.178.com/list/') >= 0){
        if(location.href.indexOf('/index.html') <0){
            location.href = location.href + '/index_s.html';
        }
    }
}
window.animateLib=function(style){
    var creatAnimate=function(s){
        var k=['-moz-','-webkit-','-ms-','-o-'],y=s.replace(/(-webkit-)/g,'');
        for(i in k){
            y+='\n\/* ###'+k[i]+'专用### *\/\n';
            y+=s.replace(/(-webkit-)/g,k[i]);
        }
        return y+'\n';
    }
    $('head').append('<style type="text/css">'+creatAnimate(style)+'</style>');
}

 

function substr(str,len){
    var len=len
    var t=str
    var count=0
    for(var i=0;i<t.length;i++){
        if(/[0-9a-z,.]/ig.test(t[i])){
            count++
        }else{
            count+=2
        }
    }
    if(t.length>len){
        t=t.substring(0,len)+'..';
    }
    return t
}

window.globalNavWow=function(obj){
    //return;
    $.each(obj,function(i,o){
        var li=$('<li></li>');
        var mai=$('<a class="mainTit" href="'+o.main.url+'" data-title="'+o.main.title+'">'+o.main.title+'</a>');
        li.append(mai)
        if(o.main.url=='http://ngabbs.com/'){
            li.addClass('nga')
        }
        if(o.main.url.indexOf('http://app.nga.donews.com/')>=0){
            li.addClass('ngaApp')
        }
        if(o.sub){
            var hide=$('<div class="hidemenu" style="display:none;"></div>')
            $.each(o.sub,function(j,o){
                var a=$('<a href="'+o.url+'">'+o.title+'</a>');
                hide.append(a)
            })
            li.append(hide)
        }
        $('#topNav').append(li)
    })
    bindTopNav()
}

function averageCookies(name,size){
    if(arguments.length==2){
        var Odate=new Date();
        Odate.setTime((Odate.getTime()+(3600000*24*365)));
        document.cookie=name+'='+size+';expires='+(Odate.toGMTString());
    }else{
        var cookies=document.cookie;
        var arrCookie=cookies.split(';')
        var CookieTxt=-1;
        for(var i=0;i<arrCookie.length;i++){
             var arr=arrCookie[i].split('=');
             if(name.replace(/[\s\0]*/g,'')==arr[0].replace(/[\s\0]*/g,'')){
                CookieTxt=arr[1];
                break;
             }
        }
        return CookieTxt;
    }
}

function bindTopNav(){
    var topNav=$('.topNav');
    topNav.find('li').each(function(){
        var hidemenu=$(this).find('.hidemenu');
        if(hidemenu.size()>0){
            $(this).addClass('on')
            $(this).hover(function(){
                hidemenu.stop().slideToggle('fast')
            },function(){
                hidemenu.stop().slideToggle('fast')
            })
        }
    })
    var fixedNav=topNav.clone();
    fixedNav.attr('class','fixedNav');
    var fixedNavBox=$('<div class="fixedNavBox animated fadeInDown" style="display:none"></div>');
    var btn=$('<div class="fixedNavBtn up"></div>')
    fixedNavBox.append(fixedNav)
    fixedNav.append(btn)
    $('body').append(fixedNavBox)
    fixedNav.find('li').each(function(){
        var hidemenu=$(this).find('.hidemenu');
        if(hidemenu.size()>0){
            $(this).addClass('on')
            $(this).hover(function(){
                hidemenu.stop().slideToggle('fast')
            },function(){
                hidemenu.stop().slideToggle('fast')
            })
        }
    })
    $(window).scroll(function(){
        var top=$(this).scrollTop();
        if(top>320){
            fixedNavBox.show()
        }else{
            fixedNavBox.hide()
        }
    }).scroll()
    var cookieIsNav='cookieIsNav'
    var isNavShow=averageCookies(cookieIsNav)=='-1'? true : false;

    if(isNavShow){
        btn.addClass('up');
    }else{
        btn.removeClass('up');
        fixedNavBox.css('top',-81)
        btn.css('top',81)
    }

    btn.click(function(){
        if($(this).hasClass('up')){
            $(this).removeClass('up')
            fixedNavBox.css('top',-81)
            btn.css('top',81)
            averageCookies(cookieIsNav,'-2')
        }else{
            $(this).addClass('up')
            fixedNavBox.css('top',0)
            btn.css('top',40)
            averageCookies(cookieIsNav,'-1')
        }
    })
}

$(function(){
    var obox = $('<div class="tooltipBox" style="position:absolute;display:none;z-index:99"></div>')
    $('body').append(obox)
    function tooltip(obj, x, y, str) {
        if (arguments.length == 0) {
            obox.hide();
            return;
        }
        if (str) {
            obox.html(str);
        }
        var e = $(window).width(),
            j = $(window).height(),
            //j = 10,
            f = $(window).scrollTop(),
            n = $(window).scrollLeft(),
            g = obox.outerHeight(true),
            k = obox.outerWidth(true),
            m = 20,
            l = obj.offset().left,
            t = obj.offset().top,
            x = l > e / 2 ? x - k - m : x + m,
            y = f + j < y + g ? f + j - g : y - m;
        obox.css({
            'display': 'inline',
            'left': x,
            'top': y
        });
    }

    $('.block06 [data-title],.fixedNavBox [data-title]').live('mouseover', function(e) {
        var str = $(this).attr('data-title')
        tooltip($(this), e.pageX, e.pageY, str);
    }).live('mousemove', function(e) {
        tooltip($(this), e.pageX, e.pageY);
    }).live('mouseout', function(e) {
        tooltip();
    });
    jQuery.getJSON('http://tools.nga.cn/iframe/7/prefix.php?callback=?', {}, function(json, textStatus) {
        var ele=$('.block06 .title .thislink');
        $.each(json,function(i,o){
            var  t= o.prefix + ':' + o.digest.replace(/。/, '');
            ele.append('<a href="javascript:void(0)" class="innerPic" data-title="'+t+'"><img src="'+o.icon+'" alt="'+t+'"></a>')
        })
    });
    jQuery.getJSON('http://tools.nga.cn/iframe/7/prefix.php?nextweek=1&callback=?', {}, function(json, textStatus) {
        var ele=$('.block06 .title .nextlink');
        $.each(json,function(i,o){
            var  t= o.prefix + ':' + o.digest.replace(/。/, '');
            ele.append('<a href="javascript:void(0)" class="innerPic" data-title="'+t+'"><img src="'+o.icon+'" alt="'+t+'"></a>')
        })
    });
    //导航
    $.ajax({
      url: 'http://wow.178.com/s/js/2016/globalNavWow.js',
      //url: '../js/animatelib.js',
      dataType: 'script',
      cache:true
    });
    $('img[data-original]').each(function(){
        //$(this).attr({'src':'http://cimg.178.com/www/v7/zyload.gif'});
    }).lazyload({
        effect : "fadeIn"
    });

    $('[data-scroll]').each(function(){
        var obj=$(this)
        var num=parseInt(obj.attr('data-scroll'))
        var item=obj.find('[scroll-item]').addClass('animated');
        var len=Math.ceil( item.size()/num );
        var btnl=$('<div class="btnl"></div>')
        var btnr=$('<div class="btnr"></div>')
        var index=0
        obj.append(btnl,btnr);
        if(num >= item.size()){
            return ;
        }
        var fn=function(){
            item.hide().each(function(i){
                if( i>=index*num && i<(index+1)*num ){
                    var s=$(this).find('img').attr('load-src');
                    $(this).show()
                    .find('img').attr('src',s);
                }
            })
        }
        fn()
        btnr.click(function(){
            item.removeClass('rollInB').addClass('rollIn')
            index=index+1>len-1?0:index+1;
            fn()
        })
        btnl.click(function(){
            item.removeClass('rollIn').addClass('rollInB')
            index=index-1<0?len-1:index-1;
            fn()
        })
    })

    //单项右滚动
    $('[data-click-change="parent"]').each(function(){
        var btn=$(this).find('.button')
        var child=$(this).find('[data-click-change="child"]')
        var auto=$(this).attr('auto-change');
        //.addClass('rollIn animated');
        var len=child.size();
        var index=-1;
        var autoFn=function(){

        }
        btn.click(function(){
            index=index+1>len-1?0:index+1
            child.hide().eq(index).show().find('img').each(function(){
                var s=$(this).attr('load-src');
                if(s){
                    $(this).attr('src',s);
                }
            })
        }).click()
        if(auto){

            setInterval(function(){
                btn.click()
            }, 5000);
        }
    })

    $('[data-form=box]').each(function(e){
        $(this).submit(function(e){
            e.preventDefault();
            var val=$(this).find('[type=text]').val();
            var hidden=$(this).find('[type=hidden]')
            if(val==''){
                alert('请输入关键字！');
                return ;
            }
            if(hidden.val()=='db'){
                window.open('http://db.178.com/wow/cn/search.html?name='+encodeURIComponent(val)+'&search=search&lang=cn&version=&search=search&sitems=no&squests=no&snpcs=no&sobjects=no&sachievements=no&sspells=no&szones=no&wtf=1');
            }else{
                window.open('http://search.178.com/cse/search?q=site:wow.178.com '+val+'&s=218385077280921315');
            }
        });
        var select=$(this).find('.select')
        var selTit=$(this).find('.selTit')
        var selList=$(this).find('.selList')
        var selOption=$(this).find('.selOption')
        var hidden=$(this).find('[type=hidden]')
        select.hover(function(){
            selList.show()
        },function(){
            selList.hide()
        })
        selOption.click(function(){
            var val=$(this).attr('data-value');
            if(val=='db'){
                hidden.val('db')
            }else{
                hidden.val('page')
            }
            selOption.removeClass('cur')
            $(this).addClass('cur')
            selTit.text($(this).text())
            selList.hide()
        }).eq(0).click()
    })

    ;(function(){
        //弹幕控制
        var timer=null;
        $('[data-danmu]').click(function(){
            var obj=$(this);
            var key=obj.attr('data-danmu');
            var con=$('#danmuContainer');
            var colour=['#a11c1c','#2aba23','#284b85','#a76662'];
            var createEle=function(objectJson,index){
                var tim=null;
                var ele=$('<div class="danmu"></div>')
                var start=-300;
                var color=colour[parseInt(Math.random()*colour.length)]
                ele.prop('stateNum',0)
                .css({
                    //width:380,
                    right:-300,
                    top:index%2*35,
                    color:color
                });
                if(objectJson['up_times']>=400){
                    ele.css({
                        //'font-weight':'bold',
                        'font-size':'16px'
                    });
                }
                ele.append('<div class="txt"><a style="color:'+color+'" href="'+objectJson.url+'">'+objectJson.title.replace('_魔兽世界','').replace('_ 魔兽世界','').replace(' - 魔兽世界','')+'</a></div>')
                ele.append('<div class="ding">顶：'+objectJson.up_times+'</div>')
                con.append(ele);
                ele.animate({
                    right : 800
                },15000);
                var ani=function(){
                    var speed=2
                    tim=setInterval(function(){
                        var cur = parseInt(ele.prop('stateNum'));
                        //var cur = parseInt(ele.prop('stateNum'));
                        var l=cur-speed;
                        if(cur<-740+start){
                            clearInterval(tim);
                            ele.remove()
                        }
                        //ele.css('right',-l)
                        if(ele[0].style.transform != undefined){
                           ele.css('transform','matrix(1,0,0,1,'+l+',0)')
                        }else{
                           ele.css('right',-l)
                        }
                        ele.prop('stateNum',l)
                    }, 20);
                }
                //ani()
                ele.hover(function(){
                   //clearInterval(tim);
                   ele.addClass('cur')
                },function(){
                   //ani()
                   ele.removeClass('cur')
                })
            }
            if(obj.hasClass('cur')){
                return;
            }
            obj.addClass('cur').siblings().removeClass('cur')
            var fnDanmu=function(arr){
                clearInterval(timer);
                con.html('');
                var index=0;
                timer=setInterval(function(){
                    if(!document.hidden){
                        createEle(arr[index],index);
                        index=index+1>arr.length-1?0:index+1;
                    }
                }, 2000);
            }
            if(obj.prop('cathData')){
                fnDanmu(obj.prop('cathData'))
            }else{
                jQuery.getJSON('http://poll.178.com/api/article.php?cb=?&action=top_list&channel_id=wow&by='+key, {}, function(json, textStatus) {
                    if(json.code==0){
                        //console.log(json);
                        obj.prop('cathData',json.result)
                        fnDanmu(json.result)
                    }
                });
            };
            averageCookies('danmuTab',$(this).index())
        }).eq(averageCookies('danmuTab')?averageCookies('danmuTab'):0).click()
    })();

    $.getJSON('http://tools.nga.cn/iframe/7/legioninvasion.php?callback=?', {}, function(json, textStatus) {
        //console.log(json)
        var innerHTML = '';
        function deltaPHP(start,end) {
            start = new Date(start*1e3).getTime();
            end = new Date(end*1e3).getTime();
            var deltaTime = Math.abs(end - start);
            var countdown = (end - start >= 0);
            return {
                'dates': Math.floor(deltaTime / 8.64e7),
                'hours': Math.floor(deltaTime / 3.6e6 % 24),
                'minutes': Math.floor(deltaTime / 6e4 % 60),
                'seconds': Math.floor(deltaTime / 1e3 % 60),
                'countdown':countdown
            }
        }

        function toMMDDhhmm(num) {
            var date = new Date(num * 1e3);
            var numStr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
            var MM = numStr[date.getMonth() + 1] || (date.getMonth() + 1);
            var DD = numStr[date.getDate()] || date.getDate();
            var hh = numStr[date.getHours()] || date.getHours();
            var mm = numStr[date.getMinutes()] || date.getMinutes();
            return MM + '/' + DD + ' ' + hh + ':' + mm;
        }
        function countdown(start,end) {
            var result = deltaPHP(start,end);
            return (result.dates?result.dates+'天':'') +
                (result.hours?result.hours+'时':'') +
                (result.minutes?result.minutes+'分':'')
        }
        if (json.ongoing.invasion){
            innerHTML += '<li class="inv_map"><ul>' +
                '<li class="name"><span class="map">'+json.ongoing.map+'</span><span class="ongoing">!!入侵中!!</span></li>'+
                '<li class="info"><span class="start">剩余：'+countdown(json.timestamp,json.ongoing.end)+'</span><span class="end">结束：'+toMMDDhhmm(json.ongoing.end)+'</span></li>'+
                '</ul></li>';
            for (var i = 0; i < 4; i++){
                if (json.next[i].map != json.ongoing.map) {
                    innerHTML += '<li class="inv_map"><ul>' +
                        '<li class="name"><span class="map">' + json.next[i].map + '</span><span class="waiting">' + countdown(json.timestamp, json.next[i].start) + '</span></li>' +
                        '<li class="info"><span class="start">开始：' + toMMDDhhmm(json.next[i].start) + '</span><span class="end">结束：' + toMMDDhhmm(json.next[i].end) + '</span></li>' +
                        '</ul></li>'
                }
            }
        }
        else {
            for (var j = 0; j < 4; j++){
                innerHTML += '<li class="inv_map"><ul>'+
                    '<li class="name"><span class="map">'+json.next[j].map+'</span><span class="waiting">'+countdown(json.timestamp,json.next[j].start)+'</span></li>'+
                    '<li class="info"><span class="start">开始：'+toMMDDhhmm(json.next[j].start)+'</span><span class="end">结束：'+toMMDDhhmm(json.next[j].end)+'</span></li>'+
                    '</ul></li>'
            }
        }
        $('#invasion').html(innerHTML);
    });

    $('[hoverlist]').each(function(){
        var li=$(this).find('li')
        li.mouseenter(function(){
            $(this).addClass('cur').siblings().removeClass('cur');
            $(this).find('img').each(function(){
                var s=$(this).attr('load-src')
                if(s){
                    $(this).attr('src',s)
                }
            })
        })
        .eq(0).mouseenter();
    })


    $('[click-tab="box"]').each(function(i){
        var o=$(this);
        var t=o.find('[click-tab="tab"]')
        var c=o.find('[click-tab="con"]')
        var m=o.find('.more')
        var murl=o.find('[data-more]')
        var k='catchCookies'+i;
        var eq=o.attr('data-eq') || 0;
        var loadsrc=function(i){
            var has=murl.eq(i).attr('data-more');
            if(has){
                m.show().attr('href',has)
            }else{
                m.hide()
            }
            c.eq(i).find('img').each(function(){
                var u=$(this).attr('load-src');
                $(this).attr('src',u);
             });
        }
        if(averageCookies(k)!=-1){
            eq=averageCookies(k);
        }
        t.click(function(){
            var i=t.index(this);
            t.removeClass('cur').eq(i).addClass('cur');
            c.hide().eq(i).show();
            averageCookies(k,i);
            loadsrc(i)
        }).eq(eq).click()
    })

    $('.hotImgs').each(function(){
        var obj=$(this).find('.boxInner').eq(0),
        index=0,
        zindex=1,
        blocks=8,
        howLong=4000,
        setTimer=null,
        width=obj.width(),
        imgs=obj.find('.imgs').eq(0),
        imgsLi=obj.find('li'),
        size=imgsLi.size(),
        DataArray=[],
        animatesArray=['rollIn','slideInRight','slideInUp','rotateInDownLeft','lightSpeedIn','fadeInLeft','bounce','swing','pulse','rubberBand','shake','tada','bounceIn','bounceInDown','flipInX','rotateIn'],
        //animatesArray=['rotateIn'],
        eleArray=[],
        eleLi=null,
        eleDigest=$('<div class="digest"></div>'),
        eleUlOuter=$('<ul class="nv"></ul>'),
        eleUlInner=$('<ul class="nvs"></ul>'),
        eleLineOuter=$('<div class="line"></div>'),
        eleLineInner=$('<span class="scNow"></span>'),
        eleBtnL=$('<span class="ll"></span>'),
        eleBtnR=$('<span class="rr"></span>');
        imgsLi.each(function(){
            var dataObject={},o=$(this);
            dataObject['pic']=o.find('img').eq(0).attr('src');
            dataObject['title']=o.find('img').eq(0).attr('alt');
            dataObject['url']=o.find('a').eq(0).attr('href');
            DataArray.push(dataObject);
        });
        var createEle=function(){
            imgs.html('');
            var li='';
            for(var j=0;j<size;j++){
                var ele='';
                for(var i=0;i<blocks;i++){
                    var o=DataArray[j];
                    ele+='<li class="animated " style="left:'+(width/blocks)*i+'px;width:'+(width/blocks)+'px"><a href="'+o.url+'"><img style="left:'+(-width/blocks*i)+'px" src="'+o.pic+'" alt="'+o.title+'" /></a></li>';
                }
                li+='<li><img src="'+o.pic+'"><span class="mask"></span></li>'
                ele=$(ele)
                eleArray.push(ele);
                imgs.append(ele)
            }
            eleLi=$(li);
            eleUlOuter.append(eleUlInner.append(eleLi));
            eleLineOuter.append(eleLineInner);
            obj.append(eleUlOuter,eleLineOuter,eleDigest,eleBtnL,eleBtnR);
        },
        controlEle=function(stop){
            zindex++;
            var c='animated '+animatesArray[parseInt(Math.random()*animatesArray.length)];
            var m=-Math.floor((index)/4)*width;
            eleUlInner.animate({'left':m+'px'},500);
            eleLineInner.stop().css('width',0).animate({'width':'100%'},howLong);
            eleDigest.html('<div class="nums"><em class="now">'+(index+1)+'</em>/<em class="size">'+size+'</em></div><div class="txt">'+DataArray[index]['title']+'</div>');
            eleLi.removeClass('on').eq(index).addClass('on');
            eleArray[index].hide().each(function(i){
                var o=$(this);
                setTimeout(function(){
                    if($.browser.msie && $.browser.version<=9){
                        o.hide().css('z-index',zindex).fadeIn();
                    }else{
                        o.hide().css('z-index',zindex).attr('class',c).show();
                    }

                },80*i)
            });
            if(stop){
                eleLineInner.stop().css('width',0)
            }
        },
        controlPlay=function(){
            eleLineInner.stop().css('width',0).animate({'width':'100%'},howLong);
            setTimer=setInterval(function(){
                index=index++>=size-1?0:index++;
                controlEle();
            },howLong);
        };
        createEle();
        controlEle();
        controlPlay();
        eleLi.click(function(){
            index=eleLi.index(this);
            controlEle('stop')
            return !1;
        });
        eleBtnR.click(function(){
            index=index++>=size-1?0:index++;
            controlEle('stop')
        }).on('selectStart',function(){
            return !1;
        });
        eleBtnL.click(function(){
            index=index--<=0?size-1:index--;
            controlEle('stop')
        }).on('selectStart',function(){
            return !1;
        });
        obj.hover(function(){
            eleBtnL.stop(0,1).fadeIn()
            eleBtnR.stop(0,1).fadeIn()
            eleLineInner.stop();
            clearInterval(setTimer);
        },function(){
            eleBtnL.stop(0,1).fadeOut()
            eleBtnR.stop(0,1).fadeOut()
            controlPlay();
        })
    });

    $.ajax({
        type:'get',
        dataType:'jsonp',
        jsonp:'cb',
        jsonpCallback:'rank_page_16year',
        url:'http://wow.178.com/public/atcount/rank_page_16year.js',
        success:function(d){
            //console.log(d);
            var uls=$('<ul></ul><ul></ul><ul></ul><ul></ul>');
            $.each(d.zhongdian,function(i,obj){
                var li=$('<li><a href="'+obj.url+'">'+obj.title+'</a><span class="d">'+obj.count+'</span></li>')
                uls.eq(parseInt(i/6)).append(li)
            })
            $('#rankZhongdian').append(uls)

            $('#rankShipin li').each(function(i){
                var obj=d.shipin[i];
                var inner='\
                    <div class="show"><a href="'+obj.url+'">'+obj.title+'</a></div>\
                    <div class="hide">\
                        <a href="'+obj.url+'"><img load-src="'+obj.picurl+'" alt="'+obj.title+'"></a>\
                        <div class="txt"><a title="'+obj.title+' '+(obj.time+'').substring(0,10)+'" href="'+obj.url+'">'+obj.title+'</a></div>\
                        <div class="click">点击：'+obj.count+'</div>\
                    </div>\
                ';
                inner=$(inner);
                if(i==0){
                    inner.find('img').attr('src',obj.picurl)
                }
                $(this).html(inner)
            })

            $('#rankTuji li').each(function(i){
                var obj=d.tuji[i];
                var inner='\
                    <div class="show"><a href="'+obj.url+'">'+obj.title+'</a></div>\
                    <div class="hide">\
                        <a href="'+obj.url+'"><img load-src="'+obj.picurl+'" alt="'+obj.title+'"></a>\
                        <div class="txt"><a title="'+obj.title+' '+(obj.time+'').substring(0,10)+'" href="'+obj.url+'">'+obj.title+'</a></div>\
                        <div class="click">点击：'+obj.count+'</div>\
                    </div>\
                ';
                inner=$(inner);
                if(i==0){
                    inner.find('img').attr('src',obj.picurl)
                }
                $(this).html(inner)
            })
        },
        error:function(){}
    });
    // $('.block15 .txt').each(function(){
    //     var t=$(this).text();
    //     $(this).text(substr(t,18))
    // })
})