import { hideLoading, showLoading } from '@uni/loading';
import { showToast } from '@uni/toast';
import { stringify } from 'querystring';
import { api } from './api';
import { sleep } from './utils';

export const sendCommand = async (name: string, param: { id: string; command: string; param?: string }) => {
  const url = 'command/execute?' + stringify(param);

  showLoading({
    content: `正在${name}`,
  });

  const res = await api(url);
  // 轮询结果
  let i = 0;
  while (i++ < 8) {
    await sleep(1000);
    const t = await api(`command/status?id=${res.id}`);
    if (t.status === 'success') {
      hideLoading();
      showToast(`${name}完成`);
      return;
    }
    if (t.status === 'error') {
      hideLoading();
      showToast(`${name}失败：${t.msg}`);
      return;
    }
  }

  hideLoading();
  showToast(`${name}失败：任务超时`);
};
