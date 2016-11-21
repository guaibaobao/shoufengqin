function getStyle(obj, attr) {  //  谁的      那个属性
    if(obj.currentStyle)  // ie 等
    {
        return obj.currentStyle[attr];  // 返回传递过来的某个属性
    }
    else
    {
        return window.getComputedStyle(obj, null)[attr];  // w3c 浏览器
    }
}

// 多个属性运动框架
function animate(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for(var attr in json) {
			if(attr == "opacity") {
				current = parseInt(getStyle(obj, attr)*100);
			}else {
				current = parseInt(getStyle(obj, attr));
			}

			var step = (json[attr] - current)/10;

			step > 0 ? Math.ceil(step) : Math.floor(step);

			if(attr == "opacity") {
				if("opacity" in obj.style) {
					obj.style.opacity = (current + step) /100;
				}else {
					obj.style.filter = "alpha(opacity = "+(current + step)+")";
				}
			}else if(attr == "zIndex") {
				obj.style.zIndex = json[attr];
			}else {
				obj.style[attr] = current + step + "px";
			}

			if(current != json[attr]) {
				flag = false;
			}

			if(flag) {
				clearInterval(obj.timer);
				if(fn) {
					fn();
				}
			}
		}
	}, 30);
}