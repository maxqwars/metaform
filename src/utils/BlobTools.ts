// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default class BlobTools {
  /*
   * Thanks: https://gist.github.com/n1ru4l/dc99062577b746e0783410b1298ab897
   */

  // eslint-disable-next-line class-methods-use-this
  public static fetchAsBlob = (url: string) =>
    fetch(url).then(response => response.blob());

  // eslint-disable-next-line class-methods-use-this
  public static convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}
