import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';

declare const wx: any;

let height = -1;

function TopSafeArea() {
  const [h, setH] = useState(0);

  useEffect(() => {
    if (height !== -1) {
      setH(height);
      return;
    }
    // 获取顶部距离
    if (typeof wx !== 'undefined' && wx.canIUse('getMenuButtonBoundingClientRect')) {
      let sysInfo = wx.getSystemInfoSync();
      let rect = wx.getMenuButtonBoundingClientRect();
      let navBarHeight = rect.bottom + 16 / sysInfo.pixelRatio;
      // 存储自定义导航栏的高度
      height = navBarHeight;
      setH(navBarHeight);
    }
  }, []);

  return (
    <View
      style={{
        height: `${h}px`,
      }}
    />
  );
}

export default TopSafeArea;
