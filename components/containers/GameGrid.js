import React, { Component } from 'react';

const range = [...Array(40).keys()];

export default class GameGrid extends Component {
  render() {
    return (
      <div>
        <div className="grid">
          {range.map(i => (
            <div className="item" key={i}>
              <div className="inner" />
            </div>
          ))}
        </div>
        <style jsx>{`
          .grid {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            padding: 0 1%;
            background: #f1f1f1;
          }
          .item {
            box-sizing: border-box;
          }
          .inner {
            background: #ccc;
          }
          .item {
            width: 85px;
            height: 105px;
            padding: 2px 0 0 2px;
          }
          .inner {
            width: 80px;
            height: 100px;
          }
          .item {
            width: 68px;
            height: 88px;
            padding: 2px 0 0 2px;
          }
          .inner {
            width: 64px;
            height: 80px;
          }
          .item {
            width: 68px;
            height: 88px;
            padding: 2px 0 0 4px;
          }
          .inner {
            width: 64px;
            height: 80px;
          }
          .item {
            width: 68px;
            height: 88px;
            padding: 4px 0 0 2px;
          }
          .inner {
            width: 64px;
            height: 80px;
          }
          @media (min-height: 330px) {
            .item {
              width: 85px;
              height: 110px;
              padding: 5px 0 0 2px;
            }
            .inner {
              width: 80px;
              height: 100px;
            }
          }
          @media (min-height: 396px) {
            .item {
              width: 102px;
              height: 132px;
              padding: 6px 0 0 3px;
            }
            .inner {
              width: 96px;
              height: 120px;
            }
          }
          @media (min-height: 462px) {
            .item {
              width: 119px;
              height: 154px;
              padding: 7px 0 0 3px;
            }
            .inner {
              width: 112px;
              height: 140px;
            }
          }
          @media (min-height: 528px) {
            .item {
              width: 136px;
              height: 176px;
              padding: 8px 0 0 4px;
            }
            .inner {
              width: 128px;
              height: 160px;
            }
          }
          @media (min-height: 594px) {
            .item {
              width: 153px;
              height: 198px;
              padding: 9px 0 0 4px;
            }
            .inner {
              width: 144px;
              height: 180px;
            }
          }
          @media (min-height: 660px) {
            .item {
              width: 170px;
              height: 220px;
              padding: 10px 0 0 5px;
            }
            .inner {
              width: 160px;
              height: 200px;
            }
          }
          @media (min-height: 726px) {
            .item {
              width: 187px;
              height: 242px;
              padding: 11px 0 0 5px;
            }
            .inner {
              width: 176px;
              height: 220px;
            }
          }
          @media (min-height: 792px) {
            .item {
              width: 204px;
              height: 264px;
              padding: 12px 0 0 6px;
            }
            .inner {
              width: 192px;
              height: 240px;
            }
          }
          @media (min-height: 858px) {
            .item {
              width: 221px;
              height: 286px;
              padding: 13px 0 0 6px;
            }
            .inner {
              width: 208px;
              height: 260px;
            }
          }
          @media (min-height: 924px) {
            .item {
              width: 238px;
              height: 308px;
              padding: 14px 0 0 7px;
            }
            .inner {
              width: 224px;
              height: 280px;
            }
          }
          @media (min-height: 990px) {
            .item {
              width: 255px;
              height: 330px;
              padding: 15px 0 0 7px;
            }
            .inner {
              width: 240px;
              height: 300px;
            }
          }
          @media (min-height: 1056px) {
            .item {
              width: 272px;
              height: 352px;
              padding: 16px 0 0 8px;
            }
            .inner {
              width: 256px;
              height: 320px;
            }
          }
          @media (min-height: 1122px) {
            .item {
              width: 289px;
              height: 374px;
              padding: 17px 0 0 8px;
            }
            .inner {
              width: 272px;
              height: 340px;
            }
          }
          @media (min-height: 1188px) {
            .item {
              width: 306px;
              height: 396px;
              padding: 18px 0 0 9px;
            }
            .inner {
              width: 288px;
              height: 360px;
            }
          }
          @media (min-height: 1254px) {
            .item {
              width: 323px;
              height: 418px;
              padding: 19px 0 0 9px;
            }
            .inner {
              width: 304px;
              height: 380px;
            }
          }
          @media (min-height: 1320px) {
            .item {
              width: 340px;
              height: 440px;
              padding: 20px 0 0 10px;
            }
            .inner {
              width: 320px;
              height: 400px;
            }
          }
          @media (min-height: 1386px) {
            .item {
              width: 357px;
              height: 462px;
              padding: 21px 0 0 10px;
            }
            .inner {
              width: 336px;
              height: 420px;
            }
          }
          @media (min-height: 1452px) {
            .item {
              width: 374px;
              height: 484px;
              padding: 22px 0 0 11px;
            }
            .inner {
              width: 352px;
              height: 440px;
            }
          }
          @media (min-height: 1518px) {
            .item {
              width: 391px;
              height: 506px;
              padding: 23px 0 0 11px;
            }
            .inner {
              width: 368px;
              height: 460px;
            }
          }
          @media (min-height: 1584px) {
            .item {
              width: 408px;
              height: 528px;
              padding: 24px 0 0 12px;
            }
            .inner {
              width: 384px;
              height: 480px;
            }
          }
          @media (min-height: 1650px) {
            .item {
              width: 425px;
              height: 550px;
              padding: 25px 0 0 12px;
            }
            .inner {
              width: 400px;
              height: 500px;
            }
          }
          @media (min-height: 1716px) {
            .item {
              width: 442px;
              height: 572px;
              padding: 26px 0 0 13px;
            }
            .inner {
              width: 416px;
              height: 520px;
            }
          }
          @media (min-height: 1782px) {
            .item {
              width: 459px;
              height: 594px;
              padding: 27px 0 0 13px;
            }
            .inner {
              width: 432px;
              height: 540px;
            }
          }
          @media (min-height: 1848px) {
            .item {
              width: 476px;
              height: 616px;
              padding: 28px 0 0 14px;
            }
            .inner {
              width: 448px;
              height: 560px;
            }
          }
          @media (min-height: 1914px) {
            .item {
              width: 493px;
              height: 638px;
              padding: 29px 0 0 14px;
            }
            .inner {
              width: 464px;
              height: 580px;
            }
          }
          @media (min-height: 1980px) {
            .item {
              width: 510px;
              height: 660px;
              padding: 30px 0 0 15px;
            }
            .inner {
              width: 480px;
              height: 600px;
            }
          }
          @media (min-height: 2046px) {
            .item {
              width: 527px;
              height: 682px;
              padding: 31px 0 0 15px;
            }
            .inner {
              width: 496px;
              height: 620px;
            }
          }
          @media (min-height: 2112px) {
            .item {
              width: 544px;
              height: 704px;
              padding: 32px 0 0 16px;
            }
            .inner {
              width: 512px;
              height: 640px;
            }
          }
          @media (min-height: 2178px) {
            .item {
              width: 561px;
              height: 726px;
              padding: 33px 0 0 16px;
            }
            .inner {
              width: 528px;
              height: 660px;
            }
          }
          @media (min-height: 2244px) {
            .item {
              width: 578px;
              height: 748px;
              padding: 34px 0 0 17px;
            }
            .inner {
              width: 544px;
              height: 680px;
            }
          }
          @media (min-height: 2310px) {
            .item {
              width: 595px;
              height: 770px;
              padding: 35px 0 0 17px;
            }
            .inner {
              width: 560px;
              height: 700px;
            }
          }
          @media (min-height: 2376px) {
            .item {
              width: 612px;
              height: 792px;
              padding: 36px 0 0 18px;
            }
            .inner {
              width: 576px;
              height: 720px;
            }
          }
          @media (min-height: 2442px) {
            .item {
              width: 629px;
              height: 814px;
              padding: 37px 0 0 18px;
            }
            .inner {
              width: 592px;
              height: 740px;
            }
          }
          @media (min-height: 2508px) {
            .item {
              width: 646px;
              height: 836px;
              padding: 38px 0 0 19px;
            }
            .inner {
              width: 608px;
              height: 760px;
            }
          }
          @media (min-height: 2574px) {
            .item {
              width: 663px;
              height: 858px;
              padding: 39px 0 0 19px;
            }
            .inner {
              width: 624px;
              height: 780px;
            }
          }
          @media (min-height: 2640px) {
            .item {
              width: 680px;
              height: 880px;
              padding: 40px 0 0 20px;
            }
            .inner {
              width: 640px;
              height: 800px;
            }
          }
          @media (min-height: 2706px) {
            .item {
              width: 697px;
              height: 902px;
              padding: 41px 0 0 20px;
            }
            .inner {
              width: 656px;
              height: 820px;
            }
          }
          @media (min-height: 2772px) {
            .item {
              width: 714px;
              height: 924px;
              padding: 42px 0 0 21px;
            }
            .inner {
              width: 672px;
              height: 840px;
            }
          }
          @media (min-height: 2838px) {
            .item {
              width: 731px;
              height: 946px;
              padding: 43px 0 0 21px;
            }
            .inner {
              width: 688px;
              height: 860px;
            }
          }
          @media (min-height: 2904px) {
            .item {
              width: 748px;
              height: 968px;
              padding: 44px 0 0 22px;
            }
            .inner {
              width: 704px;
              height: 880px;
            }
          }
          @media (min-height: 2970px) {
            .item {
              width: 765px;
              height: 990px;
              padding: 45px 0 0 22px;
            }
            .inner {
              width: 720px;
              height: 900px;
            }
          }
          @media (min-height: 3036px) {
            .item {
              width: 782px;
              height: 1012px;
              padding: 46px 0 0 23px;
            }
            .inner {
              width: 736px;
              height: 920px;
            }
          }
          @media (min-height: 3102px) {
            .item {
              width: 799px;
              height: 1034px;
              padding: 47px 0 0 23px;
            }
            .inner {
              width: 752px;
              height: 940px;
            }
          }
          @media (min-height: 3168px) {
            .item {
              width: 816px;
              height: 1056px;
              padding: 48px 0 0 24px;
            }
            .inner {
              width: 768px;
              height: 960px;
            }
          }
          @media (min-height: 3234px) {
            .item {
              width: 833px;
              height: 1078px;
              padding: 49px 0 0 24px;
            }
            .inner {
              width: 784px;
              height: 980px;
            }
          }
          @media (min-height: 3300px) {
            .item {
              width: 850px;
              height: 1100px;
              padding: 50px 0 0 25px;
            }
            .inner {
              width: 800px;
              height: 1000px;
            }
          }
          @media (min-height: 3366px) {
            .item {
              width: 867px;
              height: 1122px;
              padding: 51px 0 0 25px;
            }
            .inner {
              width: 816px;
              height: 1020px;
            }
          }
          @media (min-height: 3432px) {
            .item {
              width: 884px;
              height: 1144px;
              padding: 52px 0 0 26px;
            }
            .inner {
              width: 832px;
              height: 1040px;
            }
          }
          @media (min-height: 3498px) {
            .item {
              width: 901px;
              height: 1166px;
              padding: 53px 0 0 26px;
            }
            .inner {
              width: 848px;
              height: 1060px;
            }
          }
          @media (min-height: 3564px) {
            .item {
              width: 918px;
              height: 1188px;
              padding: 54px 0 0 27px;
            }
            .inner {
              width: 864px;
              height: 1080px;
            }
          }
          @media (min-height: 3630px) {
            .item {
              width: 935px;
              height: 1210px;
              padding: 55px 0 0 27px;
            }
            .inner {
              width: 880px;
              height: 1100px;
            }
          }
          @media (min-height: 3696px) {
            .item {
              width: 952px;
              height: 1232px;
              padding: 56px 0 0 28px;
            }
            .inner {
              width: 896px;
              height: 1120px;
            }
          }
          @media (min-height: 3762px) {
            .item {
              width: 969px;
              height: 1254px;
              padding: 57px 0 0 28px;
            }
            .inner {
              width: 912px;
              height: 1140px;
            }
          }
          @media (min-height: 3828px) {
            .item {
              width: 986px;
              height: 1276px;
              padding: 58px 0 0 29px;
            }
            .inner {
              width: 928px;
              height: 1160px;
            }
          }
          @media (min-height: 3894px) {
            .item {
              width: 1003px;
              height: 1298px;
              padding: 59px 0 0 29px;
            }
            .inner {
              width: 944px;
              height: 1180px;
            }
          }
          @media (min-height: 3960px) {
            .item {
              width: 1020px;
              height: 1320px;
              padding: 60px 0 0 30px;
            }
            .inner {
              width: 960px;
              height: 1200px;
            }
          }
        `}</style>
      </div>
    );
  }
}
