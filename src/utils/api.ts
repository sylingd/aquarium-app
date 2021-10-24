import request from '@uni/request';

export function api<T = any>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    request({
      url: `https://aquarium.sylibs.com/app/${url}`,
      success: (res) => {
        const json = JSON.parse(res.data);
        if (json.success) {
          resolve(json.data);
        } else {
          reject(new Error(json.error));
        }
      },
      fail: reject,
    });
  });
};
