import React from 'react';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {};

function AlbumFeature() {
  const albumList = [
    {
      id: 1,
      name: 'Asia Tune - POP',
      thumbnailUrl:
        'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/5/7/9/a/579a5d8737da93e119af60d95d34b8d0.jpg',
    },
    {
      id: 2,
      name: 'US - UK',
      thumbnailUrl:
        'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/5/7/9/a/579a5d8737da93e119af60d95d34b8d0.jpg',
    },
    {
      id: 3,
      name: 'Top 100 EDM',
      thumbnailUrl:
        'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/5/7/9/a/579a5d8737da93e119af60d95d34b8d0.jpg',
    },
  ];
  return (
    <div>
      <h2>Có thể bạn sẽ thích đấy</h2>
      <AlbumList albumList={albumList} />
    </div>
  );
}

export default AlbumFeature;
