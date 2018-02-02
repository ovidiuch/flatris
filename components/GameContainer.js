import React from 'react';

const GameContainer = ({ children }) => {
  return (
    <div className="outer">
      <div className="container">{children}</div>
      <style jsx global>{`
        .outer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }

        .container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3px;
        }

        .container {
          width: 80px;
          height: 120px;
          font-size: 3px;
        }
        .controls {
          display: block;
        }
        .game-height {
          height: calc(100% / 24 * 20);
        }
        @media (min-width: 120px) and (min-height: 120px) {
          .container {
            width: 80px;
            height: 100px;
            font-size: 3px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 96px) and (min-height: 144px) {
          .container {
            width: 96px;
            height: 144px;
            font-size: 3px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 144px) and (min-height: 144px) {
          .container {
            width: 96px;
            height: 120px;
            font-size: 3px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 112px) and (min-height: 168px) {
          .container {
            width: 112px;
            height: 168px;
            font-size: 4px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 168px) and (min-height: 168px) {
          .container {
            width: 112px;
            height: 140px;
            font-size: 4px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 128px) and (min-height: 192px) {
          .container {
            width: 128px;
            height: 192px;
            font-size: 4px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 192px) and (min-height: 192px) {
          .container {
            width: 128px;
            height: 160px;
            font-size: 4px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 144px) and (min-height: 216px) {
          .container {
            width: 144px;
            height: 216px;
            font-size: 5px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 216px) and (min-height: 216px) {
          .container {
            width: 144px;
            height: 180px;
            font-size: 5px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 160px) and (min-height: 240px) {
          .container {
            width: 160px;
            height: 240px;
            font-size: 6px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 240px) and (min-height: 240px) {
          .container {
            width: 160px;
            height: 200px;
            font-size: 6px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 176px) and (min-height: 264px) {
          .container {
            width: 176px;
            height: 264px;
            font-size: 6px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 288px) and (min-height: 264px) {
          .container {
            width: 192px;
            height: 240px;
            font-size: 7px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 192px) and (min-height: 288px) {
          .container {
            width: 192px;
            height: 288px;
            font-size: 7px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 312px) and (min-height: 288px) {
          .container {
            width: 208px;
            height: 260px;
            font-size: 8px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 208px) and (min-height: 312px) {
          .container {
            width: 208px;
            height: 312px;
            font-size: 8px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 336px) and (min-height: 312px) {
          .container {
            width: 224px;
            height: 280px;
            font-size: 8px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 224px) and (min-height: 336px) {
          .container {
            width: 224px;
            height: 336px;
            font-size: 8px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 360px) and (min-height: 336px) {
          .container {
            width: 240px;
            height: 300px;
            font-size: 9px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 240px) and (min-height: 360px) {
          .container {
            width: 240px;
            height: 360px;
            font-size: 9px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 384px) and (min-height: 360px) {
          .container {
            width: 256px;
            height: 320px;
            font-size: 9px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 256px) and (min-height: 384px) {
          .container {
            width: 256px;
            height: 384px;
            font-size: 9px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 408px) and (min-height: 384px) {
          .container {
            width: 272px;
            height: 340px;
            font-size: 10px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 272px) and (min-height: 408px) {
          .container {
            width: 272px;
            height: 408px;
            font-size: 10px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 432px) and (min-height: 408px) {
          .container {
            width: 288px;
            height: 360px;
            font-size: 11px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 288px) and (min-height: 432px) {
          .container {
            width: 288px;
            height: 432px;
            font-size: 11px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 456px) and (min-height: 432px) {
          .container {
            width: 304px;
            height: 380px;
            font-size: 11px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 304px) and (min-height: 456px) {
          .container {
            width: 304px;
            height: 456px;
            font-size: 11px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 480px) and (min-height: 456px) {
          .container {
            width: 320px;
            height: 400px;
            font-size: 12px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 320px) and (min-height: 480px) {
          .container {
            width: 320px;
            height: 480px;
            font-size: 12px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 504px) and (min-height: 480px) {
          .container {
            width: 336px;
            height: 420px;
            font-size: 12px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 336px) and (min-height: 504px) {
          .container {
            width: 336px;
            height: 504px;
            font-size: 12px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 528px) and (min-height: 504px) {
          .container {
            width: 352px;
            height: 440px;
            font-size: 13px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 352px) and (min-height: 528px) {
          .container {
            width: 352px;
            height: 528px;
            font-size: 13px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 576px) and (min-height: 528px) {
          .container {
            width: 384px;
            height: 480px;
            font-size: 14px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 368px) and (min-height: 552px) {
          .container {
            width: 368px;
            height: 552px;
            font-size: 14px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 600px) and (min-height: 552px) {
          .container {
            width: 400px;
            height: 500px;
            font-size: 15px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 384px) and (min-height: 576px) {
          .container {
            width: 384px;
            height: 576px;
            font-size: 14px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 624px) and (min-height: 576px) {
          .container {
            width: 416px;
            height: 520px;
            font-size: 16px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 400px) and (min-height: 600px) {
          .container {
            width: 400px;
            height: 600px;
            font-size: 15px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 648px) and (min-height: 600px) {
          .container {
            width: 432px;
            height: 540px;
            font-size: 16px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 416px) and (min-height: 624px) {
          .container {
            width: 416px;
            height: 624px;
            font-size: 16px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 672px) and (min-height: 624px) {
          .container {
            width: 448px;
            height: 560px;
            font-size: 17px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 432px) and (min-height: 648px) {
          .container {
            width: 432px;
            height: 648px;
            font-size: 16px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 696px) and (min-height: 648px) {
          .container {
            width: 464px;
            height: 580px;
            font-size: 17px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 448px) and (min-height: 672px) {
          .container {
            width: 448px;
            height: 672px;
            font-size: 17px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 720px) and (min-height: 672px) {
          .container {
            width: 480px;
            height: 600px;
            font-size: 18px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 464px) and (min-height: 696px) {
          .container {
            width: 464px;
            height: 696px;
            font-size: 17px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 744px) and (min-height: 696px) {
          .container {
            width: 496px;
            height: 620px;
            font-size: 19px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 480px) and (min-height: 720px) {
          .container {
            width: 480px;
            height: 720px;
            font-size: 18px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 768px) and (min-height: 720px) {
          .container {
            width: 512px;
            height: 640px;
            font-size: 19px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 496px) and (min-height: 744px) {
          .container {
            width: 496px;
            height: 744px;
            font-size: 19px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 792px) and (min-height: 744px) {
          .container {
            width: 528px;
            height: 660px;
            font-size: 20px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 512px) and (min-height: 768px) {
          .container {
            width: 512px;
            height: 768px;
            font-size: 19px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 816px) and (min-height: 768px) {
          .container {
            width: 544px;
            height: 680px;
            font-size: 20px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 528px) and (min-height: 792px) {
          .container {
            width: 528px;
            height: 792px;
            font-size: 20px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 864px) and (min-height: 792px) {
          .container {
            width: 576px;
            height: 720px;
            font-size: 22px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 544px) and (min-height: 816px) {
          .container {
            width: 544px;
            height: 816px;
            font-size: 20px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 888px) and (min-height: 816px) {
          .container {
            width: 592px;
            height: 740px;
            font-size: 22px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 560px) and (min-height: 840px) {
          .container {
            width: 560px;
            height: 840px;
            font-size: 21px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 912px) and (min-height: 840px) {
          .container {
            width: 608px;
            height: 760px;
            font-size: 23px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 576px) and (min-height: 864px) {
          .container {
            width: 576px;
            height: 864px;
            font-size: 22px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 936px) and (min-height: 864px) {
          .container {
            width: 624px;
            height: 780px;
            font-size: 24px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 592px) and (min-height: 888px) {
          .container {
            width: 592px;
            height: 888px;
            font-size: 22px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 960px) and (min-height: 888px) {
          .container {
            width: 640px;
            height: 800px;
            font-size: 24px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 608px) and (min-height: 912px) {
          .container {
            width: 608px;
            height: 912px;
            font-size: 23px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 984px) and (min-height: 912px) {
          .container {
            width: 656px;
            height: 820px;
            font-size: 25px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 624px) and (min-height: 936px) {
          .container {
            width: 624px;
            height: 936px;
            font-size: 24px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1008px) and (min-height: 936px) {
          .container {
            width: 672px;
            height: 840px;
            font-size: 25px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 640px) and (min-height: 960px) {
          .container {
            width: 640px;
            height: 960px;
            font-size: 24px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1032px) and (min-height: 960px) {
          .container {
            width: 688px;
            height: 860px;
            font-size: 26px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 656px) and (min-height: 984px) {
          .container {
            width: 656px;
            height: 984px;
            font-size: 25px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1056px) and (min-height: 984px) {
          .container {
            width: 704px;
            height: 880px;
            font-size: 27px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 672px) and (min-height: 1008px) {
          .container {
            width: 672px;
            height: 1008px;
            font-size: 25px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1080px) and (min-height: 1008px) {
          .container {
            width: 720px;
            height: 900px;
            font-size: 27px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 688px) and (min-height: 1032px) {
          .container {
            width: 688px;
            height: 1032px;
            font-size: 26px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1104px) and (min-height: 1032px) {
          .container {
            width: 736px;
            height: 920px;
            font-size: 28px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 704px) and (min-height: 1056px) {
          .container {
            width: 704px;
            height: 1056px;
            font-size: 27px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1152px) and (min-height: 1056px) {
          .container {
            width: 768px;
            height: 960px;
            font-size: 29px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 720px) and (min-height: 1080px) {
          .container {
            width: 720px;
            height: 1080px;
            font-size: 27px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1176px) and (min-height: 1080px) {
          .container {
            width: 784px;
            height: 980px;
            font-size: 30px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 736px) and (min-height: 1104px) {
          .container {
            width: 736px;
            height: 1104px;
            font-size: 28px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1200px) and (min-height: 1104px) {
          .container {
            width: 800px;
            height: 1000px;
            font-size: 30px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 752px) and (min-height: 1128px) {
          .container {
            width: 752px;
            height: 1128px;
            font-size: 28px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1224px) and (min-height: 1128px) {
          .container {
            width: 816px;
            height: 1020px;
            font-size: 31px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 768px) and (min-height: 1152px) {
          .container {
            width: 768px;
            height: 1152px;
            font-size: 29px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1248px) and (min-height: 1152px) {
          .container {
            width: 832px;
            height: 1040px;
            font-size: 32px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 784px) and (min-height: 1176px) {
          .container {
            width: 784px;
            height: 1176px;
            font-size: 30px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1272px) and (min-height: 1176px) {
          .container {
            width: 848px;
            height: 1060px;
            font-size: 32px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 800px) and (min-height: 1200px) {
          .container {
            width: 800px;
            height: 1200px;
            font-size: 30px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1296px) and (min-height: 1200px) {
          .container {
            width: 864px;
            height: 1080px;
            font-size: 33px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 816px) and (min-height: 1224px) {
          .container {
            width: 816px;
            height: 1224px;
            font-size: 31px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1320px) and (min-height: 1224px) {
          .container {
            width: 880px;
            height: 1100px;
            font-size: 33px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 832px) and (min-height: 1248px) {
          .container {
            width: 832px;
            height: 1248px;
            font-size: 32px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1344px) and (min-height: 1248px) {
          .container {
            width: 896px;
            height: 1120px;
            font-size: 34px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 848px) and (min-height: 1272px) {
          .container {
            width: 848px;
            height: 1272px;
            font-size: 32px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1368px) and (min-height: 1272px) {
          .container {
            width: 912px;
            height: 1140px;
            font-size: 35px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 864px) and (min-height: 1296px) {
          .container {
            width: 864px;
            height: 1296px;
            font-size: 33px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1392px) and (min-height: 1296px) {
          .container {
            width: 928px;
            height: 1160px;
            font-size: 35px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 880px) and (min-height: 1320px) {
          .container {
            width: 880px;
            height: 1320px;
            font-size: 33px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1440px) and (min-height: 1320px) {
          .container {
            width: 960px;
            height: 1200px;
            font-size: 36px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 896px) and (min-height: 1344px) {
          .container {
            width: 896px;
            height: 1344px;
            font-size: 34px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1464px) and (min-height: 1344px) {
          .container {
            width: 976px;
            height: 1220px;
            font-size: 37px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 912px) and (min-height: 1368px) {
          .container {
            width: 912px;
            height: 1368px;
            font-size: 35px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1488px) and (min-height: 1368px) {
          .container {
            width: 992px;
            height: 1240px;
            font-size: 38px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 928px) and (min-height: 1392px) {
          .container {
            width: 928px;
            height: 1392px;
            font-size: 35px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1512px) and (min-height: 1392px) {
          .container {
            width: 1008px;
            height: 1260px;
            font-size: 38px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 944px) and (min-height: 1416px) {
          .container {
            width: 944px;
            height: 1416px;
            font-size: 36px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1536px) and (min-height: 1416px) {
          .container {
            width: 1024px;
            height: 1280px;
            font-size: 39px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 960px) and (min-height: 1440px) {
          .container {
            width: 960px;
            height: 1440px;
            font-size: 36px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1560px) and (min-height: 1440px) {
          .container {
            width: 1040px;
            height: 1300px;
            font-size: 40px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 976px) and (min-height: 1464px) {
          .container {
            width: 976px;
            height: 1464px;
            font-size: 37px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1584px) and (min-height: 1464px) {
          .container {
            width: 1056px;
            height: 1320px;
            font-size: 40px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 992px) and (min-height: 1488px) {
          .container {
            width: 992px;
            height: 1488px;
            font-size: 38px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1608px) and (min-height: 1488px) {
          .container {
            width: 1072px;
            height: 1340px;
            font-size: 41px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1008px) and (min-height: 1512px) {
          .container {
            width: 1008px;
            height: 1512px;
            font-size: 38px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1632px) and (min-height: 1512px) {
          .container {
            width: 1088px;
            height: 1360px;
            font-size: 41px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1024px) and (min-height: 1536px) {
          .container {
            width: 1024px;
            height: 1536px;
            font-size: 39px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1656px) and (min-height: 1536px) {
          .container {
            width: 1104px;
            height: 1380px;
            font-size: 42px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1040px) and (min-height: 1560px) {
          .container {
            width: 1040px;
            height: 1560px;
            font-size: 40px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1680px) and (min-height: 1560px) {
          .container {
            width: 1120px;
            height: 1400px;
            font-size: 43px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1056px) and (min-height: 1584px) {
          .container {
            width: 1056px;
            height: 1584px;
            font-size: 40px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1728px) and (min-height: 1584px) {
          .container {
            width: 1152px;
            height: 1440px;
            font-size: 44px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1072px) and (min-height: 1608px) {
          .container {
            width: 1072px;
            height: 1608px;
            font-size: 41px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1752px) and (min-height: 1608px) {
          .container {
            width: 1168px;
            height: 1460px;
            font-size: 44px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1088px) and (min-height: 1632px) {
          .container {
            width: 1088px;
            height: 1632px;
            font-size: 41px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1776px) and (min-height: 1632px) {
          .container {
            width: 1184px;
            height: 1480px;
            font-size: 45px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1104px) and (min-height: 1656px) {
          .container {
            width: 1104px;
            height: 1656px;
            font-size: 42px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1800px) and (min-height: 1656px) {
          .container {
            width: 1200px;
            height: 1500px;
            font-size: 46px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1120px) and (min-height: 1680px) {
          .container {
            width: 1120px;
            height: 1680px;
            font-size: 43px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1824px) and (min-height: 1680px) {
          .container {
            width: 1216px;
            height: 1520px;
            font-size: 46px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1136px) and (min-height: 1704px) {
          .container {
            width: 1136px;
            height: 1704px;
            font-size: 43px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1848px) and (min-height: 1704px) {
          .container {
            width: 1232px;
            height: 1540px;
            font-size: 47px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1152px) and (min-height: 1728px) {
          .container {
            width: 1152px;
            height: 1728px;
            font-size: 44px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1872px) and (min-height: 1728px) {
          .container {
            width: 1248px;
            height: 1560px;
            font-size: 48px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1168px) and (min-height: 1752px) {
          .container {
            width: 1168px;
            height: 1752px;
            font-size: 44px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1896px) and (min-height: 1752px) {
          .container {
            width: 1264px;
            height: 1580px;
            font-size: 48px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1184px) and (min-height: 1776px) {
          .container {
            width: 1184px;
            height: 1776px;
            font-size: 45px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1920px) and (min-height: 1776px) {
          .container {
            width: 1280px;
            height: 1600px;
            font-size: 49px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1200px) and (min-height: 1800px) {
          .container {
            width: 1200px;
            height: 1800px;
            font-size: 46px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1944px) and (min-height: 1800px) {
          .container {
            width: 1296px;
            height: 1620px;
            font-size: 49px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1216px) and (min-height: 1824px) {
          .container {
            width: 1216px;
            height: 1824px;
            font-size: 46px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 1968px) and (min-height: 1824px) {
          .container {
            width: 1312px;
            height: 1640px;
            font-size: 50px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1232px) and (min-height: 1848px) {
          .container {
            width: 1232px;
            height: 1848px;
            font-size: 47px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2016px) and (min-height: 1848px) {
          .container {
            width: 1344px;
            height: 1680px;
            font-size: 51px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1248px) and (min-height: 1872px) {
          .container {
            width: 1248px;
            height: 1872px;
            font-size: 48px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2040px) and (min-height: 1872px) {
          .container {
            width: 1360px;
            height: 1700px;
            font-size: 52px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1264px) and (min-height: 1896px) {
          .container {
            width: 1264px;
            height: 1896px;
            font-size: 48px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2064px) and (min-height: 1896px) {
          .container {
            width: 1376px;
            height: 1720px;
            font-size: 52px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1280px) and (min-height: 1920px) {
          .container {
            width: 1280px;
            height: 1920px;
            font-size: 49px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2088px) and (min-height: 1920px) {
          .container {
            width: 1392px;
            height: 1740px;
            font-size: 53px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1296px) and (min-height: 1944px) {
          .container {
            width: 1296px;
            height: 1944px;
            font-size: 49px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2112px) and (min-height: 1944px) {
          .container {
            width: 1408px;
            height: 1760px;
            font-size: 54px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1312px) and (min-height: 1968px) {
          .container {
            width: 1312px;
            height: 1968px;
            font-size: 50px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2136px) and (min-height: 1968px) {
          .container {
            width: 1424px;
            height: 1780px;
            font-size: 54px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1328px) and (min-height: 1992px) {
          .container {
            width: 1328px;
            height: 1992px;
            font-size: 51px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2160px) and (min-height: 1992px) {
          .container {
            width: 1440px;
            height: 1800px;
            font-size: 55px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1344px) and (min-height: 2016px) {
          .container {
            width: 1344px;
            height: 2016px;
            font-size: 51px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2184px) and (min-height: 2016px) {
          .container {
            width: 1456px;
            height: 1820px;
            font-size: 56px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1360px) and (min-height: 2040px) {
          .container {
            width: 1360px;
            height: 2040px;
            font-size: 52px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2208px) and (min-height: 2040px) {
          .container {
            width: 1472px;
            height: 1840px;
            font-size: 56px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1376px) and (min-height: 2064px) {
          .container {
            width: 1376px;
            height: 2064px;
            font-size: 52px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2232px) and (min-height: 2064px) {
          .container {
            width: 1488px;
            height: 1860px;
            font-size: 57px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1392px) and (min-height: 2088px) {
          .container {
            width: 1392px;
            height: 2088px;
            font-size: 53px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2256px) and (min-height: 2088px) {
          .container {
            width: 1504px;
            height: 1880px;
            font-size: 57px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1408px) and (min-height: 2112px) {
          .container {
            width: 1408px;
            height: 2112px;
            font-size: 54px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2304px) and (min-height: 2112px) {
          .container {
            width: 1536px;
            height: 1920px;
            font-size: 59px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1424px) and (min-height: 2136px) {
          .container {
            width: 1424px;
            height: 2136px;
            font-size: 54px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2328px) and (min-height: 2136px) {
          .container {
            width: 1552px;
            height: 1940px;
            font-size: 59px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1440px) and (min-height: 2160px) {
          .container {
            width: 1440px;
            height: 2160px;
            font-size: 55px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2352px) and (min-height: 2160px) {
          .container {
            width: 1568px;
            height: 1960px;
            font-size: 60px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1456px) and (min-height: 2184px) {
          .container {
            width: 1456px;
            height: 2184px;
            font-size: 56px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2376px) and (min-height: 2184px) {
          .container {
            width: 1584px;
            height: 1980px;
            font-size: 60px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1472px) and (min-height: 2208px) {
          .container {
            width: 1472px;
            height: 2208px;
            font-size: 56px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2400px) and (min-height: 2208px) {
          .container {
            width: 1600px;
            height: 2000px;
            font-size: 61px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1488px) and (min-height: 2232px) {
          .container {
            width: 1488px;
            height: 2232px;
            font-size: 57px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2424px) and (min-height: 2232px) {
          .container {
            width: 1616px;
            height: 2020px;
            font-size: 62px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1504px) and (min-height: 2256px) {
          .container {
            width: 1504px;
            height: 2256px;
            font-size: 57px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2448px) and (min-height: 2256px) {
          .container {
            width: 1632px;
            height: 2040px;
            font-size: 62px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1520px) and (min-height: 2280px) {
          .container {
            width: 1520px;
            height: 2280px;
            font-size: 58px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2472px) and (min-height: 2280px) {
          .container {
            width: 1648px;
            height: 2060px;
            font-size: 63px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1536px) and (min-height: 2304px) {
          .container {
            width: 1536px;
            height: 2304px;
            font-size: 59px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2496px) and (min-height: 2304px) {
          .container {
            width: 1664px;
            height: 2080px;
            font-size: 64px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1552px) and (min-height: 2328px) {
          .container {
            width: 1552px;
            height: 2328px;
            font-size: 59px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2520px) and (min-height: 2328px) {
          .container {
            width: 1680px;
            height: 2100px;
            font-size: 64px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1568px) and (min-height: 2352px) {
          .container {
            width: 1568px;
            height: 2352px;
            font-size: 60px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2544px) and (min-height: 2352px) {
          .container {
            width: 1696px;
            height: 2120px;
            font-size: 65px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1584px) and (min-height: 2376px) {
          .container {
            width: 1584px;
            height: 2376px;
            font-size: 60px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2592px) and (min-height: 2376px) {
          .container {
            width: 1728px;
            height: 2160px;
            font-size: 66px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1600px) and (min-height: 2400px) {
          .container {
            width: 1600px;
            height: 2400px;
            font-size: 61px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2616px) and (min-height: 2400px) {
          .container {
            width: 1744px;
            height: 2180px;
            font-size: 67px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1616px) and (min-height: 2424px) {
          .container {
            width: 1616px;
            height: 2424px;
            font-size: 62px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2640px) and (min-height: 2424px) {
          .container {
            width: 1760px;
            height: 2200px;
            font-size: 67px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1632px) and (min-height: 2448px) {
          .container {
            width: 1632px;
            height: 2448px;
            font-size: 62px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2664px) and (min-height: 2448px) {
          .container {
            width: 1776px;
            height: 2220px;
            font-size: 68px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1648px) and (min-height: 2472px) {
          .container {
            width: 1648px;
            height: 2472px;
            font-size: 63px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2688px) and (min-height: 2472px) {
          .container {
            width: 1792px;
            height: 2240px;
            font-size: 68px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1664px) and (min-height: 2496px) {
          .container {
            width: 1664px;
            height: 2496px;
            font-size: 64px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2712px) and (min-height: 2496px) {
          .container {
            width: 1808px;
            height: 2260px;
            font-size: 69px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1680px) and (min-height: 2520px) {
          .container {
            width: 1680px;
            height: 2520px;
            font-size: 64px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2736px) and (min-height: 2520px) {
          .container {
            width: 1824px;
            height: 2280px;
            font-size: 70px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1696px) and (min-height: 2544px) {
          .container {
            width: 1696px;
            height: 2544px;
            font-size: 65px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2760px) and (min-height: 2544px) {
          .container {
            width: 1840px;
            height: 2300px;
            font-size: 70px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1712px) and (min-height: 2568px) {
          .container {
            width: 1712px;
            height: 2568px;
            font-size: 65px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2784px) and (min-height: 2568px) {
          .container {
            width: 1856px;
            height: 2320px;
            font-size: 71px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1728px) and (min-height: 2592px) {
          .container {
            width: 1728px;
            height: 2592px;
            font-size: 66px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2808px) and (min-height: 2592px) {
          .container {
            width: 1872px;
            height: 2340px;
            font-size: 72px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1744px) and (min-height: 2616px) {
          .container {
            width: 1744px;
            height: 2616px;
            font-size: 67px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2832px) and (min-height: 2616px) {
          .container {
            width: 1888px;
            height: 2360px;
            font-size: 72px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1760px) and (min-height: 2640px) {
          .container {
            width: 1760px;
            height: 2640px;
            font-size: 67px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2880px) and (min-height: 2640px) {
          .container {
            width: 1920px;
            height: 2400px;
            font-size: 73px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1776px) and (min-height: 2664px) {
          .container {
            width: 1776px;
            height: 2664px;
            font-size: 68px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2904px) and (min-height: 2664px) {
          .container {
            width: 1936px;
            height: 2420px;
            font-size: 74px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1792px) and (min-height: 2688px) {
          .container {
            width: 1792px;
            height: 2688px;
            font-size: 68px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2928px) and (min-height: 2688px) {
          .container {
            width: 1952px;
            height: 2440px;
            font-size: 75px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1808px) and (min-height: 2712px) {
          .container {
            width: 1808px;
            height: 2712px;
            font-size: 69px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2952px) and (min-height: 2712px) {
          .container {
            width: 1968px;
            height: 2460px;
            font-size: 75px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1824px) and (min-height: 2736px) {
          .container {
            width: 1824px;
            height: 2736px;
            font-size: 70px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 2976px) and (min-height: 2736px) {
          .container {
            width: 1984px;
            height: 2480px;
            font-size: 76px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1840px) and (min-height: 2760px) {
          .container {
            width: 1840px;
            height: 2760px;
            font-size: 70px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3000px) and (min-height: 2760px) {
          .container {
            width: 2000px;
            height: 2500px;
            font-size: 76px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1856px) and (min-height: 2784px) {
          .container {
            width: 1856px;
            height: 2784px;
            font-size: 71px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3024px) and (min-height: 2784px) {
          .container {
            width: 2016px;
            height: 2520px;
            font-size: 77px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1872px) and (min-height: 2808px) {
          .container {
            width: 1872px;
            height: 2808px;
            font-size: 72px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3048px) and (min-height: 2808px) {
          .container {
            width: 2032px;
            height: 2540px;
            font-size: 78px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1888px) and (min-height: 2832px) {
          .container {
            width: 1888px;
            height: 2832px;
            font-size: 72px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3072px) and (min-height: 2832px) {
          .container {
            width: 2048px;
            height: 2560px;
            font-size: 78px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1904px) and (min-height: 2856px) {
          .container {
            width: 1904px;
            height: 2856px;
            font-size: 73px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3096px) and (min-height: 2856px) {
          .container {
            width: 2064px;
            height: 2580px;
            font-size: 79px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1920px) and (min-height: 2880px) {
          .container {
            width: 1920px;
            height: 2880px;
            font-size: 73px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3120px) and (min-height: 2880px) {
          .container {
            width: 2080px;
            height: 2600px;
            font-size: 80px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1936px) and (min-height: 2904px) {
          .container {
            width: 1936px;
            height: 2904px;
            font-size: 74px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3168px) and (min-height: 2904px) {
          .container {
            width: 2112px;
            height: 2640px;
            font-size: 81px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1952px) and (min-height: 2928px) {
          .container {
            width: 1952px;
            height: 2928px;
            font-size: 75px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3192px) and (min-height: 2928px) {
          .container {
            width: 2128px;
            height: 2660px;
            font-size: 81px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1968px) and (min-height: 2952px) {
          .container {
            width: 1968px;
            height: 2952px;
            font-size: 75px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3216px) and (min-height: 2952px) {
          .container {
            width: 2144px;
            height: 2680px;
            font-size: 82px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 1984px) and (min-height: 2976px) {
          .container {
            width: 1984px;
            height: 2976px;
            font-size: 76px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3240px) and (min-height: 2976px) {
          .container {
            width: 2160px;
            height: 2700px;
            font-size: 83px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2000px) and (min-height: 3000px) {
          .container {
            width: 2000px;
            height: 3000px;
            font-size: 76px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3264px) and (min-height: 3000px) {
          .container {
            width: 2176px;
            height: 2720px;
            font-size: 83px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2016px) and (min-height: 3024px) {
          .container {
            width: 2016px;
            height: 3024px;
            font-size: 77px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3288px) and (min-height: 3024px) {
          .container {
            width: 2192px;
            height: 2740px;
            font-size: 84px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2032px) and (min-height: 3048px) {
          .container {
            width: 2032px;
            height: 3048px;
            font-size: 78px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3312px) and (min-height: 3048px) {
          .container {
            width: 2208px;
            height: 2760px;
            font-size: 84px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2048px) and (min-height: 3072px) {
          .container {
            width: 2048px;
            height: 3072px;
            font-size: 78px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3336px) and (min-height: 3072px) {
          .container {
            width: 2224px;
            height: 2780px;
            font-size: 85px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2064px) and (min-height: 3096px) {
          .container {
            width: 2064px;
            height: 3096px;
            font-size: 79px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3360px) and (min-height: 3096px) {
          .container {
            width: 2240px;
            height: 2800px;
            font-size: 86px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2080px) and (min-height: 3120px) {
          .container {
            width: 2080px;
            height: 3120px;
            font-size: 80px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3384px) and (min-height: 3120px) {
          .container {
            width: 2256px;
            height: 2820px;
            font-size: 86px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2096px) and (min-height: 3144px) {
          .container {
            width: 2096px;
            height: 3144px;
            font-size: 80px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3408px) and (min-height: 3144px) {
          .container {
            width: 2272px;
            height: 2840px;
            font-size: 87px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2112px) and (min-height: 3168px) {
          .container {
            width: 2112px;
            height: 3168px;
            font-size: 81px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3456px) and (min-height: 3168px) {
          .container {
            width: 2304px;
            height: 2880px;
            font-size: 88px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2128px) and (min-height: 3192px) {
          .container {
            width: 2128px;
            height: 3192px;
            font-size: 81px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3480px) and (min-height: 3192px) {
          .container {
            width: 2320px;
            height: 2900px;
            font-size: 89px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2144px) and (min-height: 3216px) {
          .container {
            width: 2144px;
            height: 3216px;
            font-size: 82px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3504px) and (min-height: 3216px) {
          .container {
            width: 2336px;
            height: 2920px;
            font-size: 89px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2160px) and (min-height: 3240px) {
          .container {
            width: 2160px;
            height: 3240px;
            font-size: 83px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3528px) and (min-height: 3240px) {
          .container {
            width: 2352px;
            height: 2940px;
            font-size: 90px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2176px) and (min-height: 3264px) {
          .container {
            width: 2176px;
            height: 3264px;
            font-size: 83px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3552px) and (min-height: 3264px) {
          .container {
            width: 2368px;
            height: 2960px;
            font-size: 91px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2192px) and (min-height: 3288px) {
          .container {
            width: 2192px;
            height: 3288px;
            font-size: 84px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3576px) and (min-height: 3288px) {
          .container {
            width: 2384px;
            height: 2980px;
            font-size: 91px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2208px) and (min-height: 3312px) {
          .container {
            width: 2208px;
            height: 3312px;
            font-size: 84px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3600px) and (min-height: 3312px) {
          .container {
            width: 2400px;
            height: 3000px;
            font-size: 92px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2224px) and (min-height: 3336px) {
          .container {
            width: 2224px;
            height: 3336px;
            font-size: 85px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3624px) and (min-height: 3336px) {
          .container {
            width: 2416px;
            height: 3020px;
            font-size: 92px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2240px) and (min-height: 3360px) {
          .container {
            width: 2240px;
            height: 3360px;
            font-size: 86px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3648px) and (min-height: 3360px) {
          .container {
            width: 2432px;
            height: 3040px;
            font-size: 93px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2256px) and (min-height: 3384px) {
          .container {
            width: 2256px;
            height: 3384px;
            font-size: 86px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3672px) and (min-height: 3384px) {
          .container {
            width: 2448px;
            height: 3060px;
            font-size: 94px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2272px) and (min-height: 3408px) {
          .container {
            width: 2272px;
            height: 3408px;
            font-size: 87px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3696px) and (min-height: 3408px) {
          .container {
            width: 2464px;
            height: 3080px;
            font-size: 94px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2288px) and (min-height: 3432px) {
          .container {
            width: 2288px;
            height: 3432px;
            font-size: 88px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3744px) and (min-height: 3432px) {
          .container {
            width: 2496px;
            height: 3120px;
            font-size: 96px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2304px) and (min-height: 3456px) {
          .container {
            width: 2304px;
            height: 3456px;
            font-size: 88px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3768px) and (min-height: 3456px) {
          .container {
            width: 2512px;
            height: 3140px;
            font-size: 96px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2320px) and (min-height: 3480px) {
          .container {
            width: 2320px;
            height: 3480px;
            font-size: 89px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3792px) and (min-height: 3480px) {
          .container {
            width: 2528px;
            height: 3160px;
            font-size: 97px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2336px) and (min-height: 3504px) {
          .container {
            width: 2336px;
            height: 3504px;
            font-size: 89px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3816px) and (min-height: 3504px) {
          .container {
            width: 2544px;
            height: 3180px;
            font-size: 97px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2352px) and (min-height: 3528px) {
          .container {
            width: 2352px;
            height: 3528px;
            font-size: 90px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3840px) and (min-height: 3528px) {
          .container {
            width: 2560px;
            height: 3200px;
            font-size: 98px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2368px) and (min-height: 3552px) {
          .container {
            width: 2368px;
            height: 3552px;
            font-size: 91px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3864px) and (min-height: 3552px) {
          .container {
            width: 2576px;
            height: 3220px;
            font-size: 99px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2384px) and (min-height: 3576px) {
          .container {
            width: 2384px;
            height: 3576px;
            font-size: 91px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3888px) and (min-height: 3576px) {
          .container {
            width: 2592px;
            height: 3240px;
            font-size: 99px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2400px) and (min-height: 3600px) {
          .container {
            width: 2400px;
            height: 3600px;
            font-size: 92px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3912px) and (min-height: 3600px) {
          .container {
            width: 2608px;
            height: 3260px;
            font-size: 100px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2416px) and (min-height: 3624px) {
          .container {
            width: 2416px;
            height: 3624px;
            font-size: 92px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3936px) and (min-height: 3624px) {
          .container {
            width: 2624px;
            height: 3280px;
            font-size: 100px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2432px) and (min-height: 3648px) {
          .container {
            width: 2432px;
            height: 3648px;
            font-size: 93px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3960px) and (min-height: 3648px) {
          .container {
            width: 2640px;
            height: 3300px;
            font-size: 101px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2448px) and (min-height: 3672px) {
          .container {
            width: 2448px;
            height: 3672px;
            font-size: 94px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 3984px) and (min-height: 3672px) {
          .container {
            width: 2656px;
            height: 3320px;
            font-size: 102px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2464px) and (min-height: 3696px) {
          .container {
            width: 2464px;
            height: 3696px;
            font-size: 94px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4032px) and (min-height: 3696px) {
          .container {
            width: 2688px;
            height: 3360px;
            font-size: 103px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2480px) and (min-height: 3720px) {
          .container {
            width: 2480px;
            height: 3720px;
            font-size: 95px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4056px) and (min-height: 3720px) {
          .container {
            width: 2704px;
            height: 3380px;
            font-size: 104px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2496px) and (min-height: 3744px) {
          .container {
            width: 2496px;
            height: 3744px;
            font-size: 96px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4080px) and (min-height: 3744px) {
          .container {
            width: 2720px;
            height: 3400px;
            font-size: 104px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2512px) and (min-height: 3768px) {
          .container {
            width: 2512px;
            height: 3768px;
            font-size: 96px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4104px) and (min-height: 3768px) {
          .container {
            width: 2736px;
            height: 3420px;
            font-size: 105px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2528px) and (min-height: 3792px) {
          .container {
            width: 2528px;
            height: 3792px;
            font-size: 97px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4128px) and (min-height: 3792px) {
          .container {
            width: 2752px;
            height: 3440px;
            font-size: 105px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2544px) and (min-height: 3816px) {
          .container {
            width: 2544px;
            height: 3816px;
            font-size: 97px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4152px) and (min-height: 3816px) {
          .container {
            width: 2768px;
            height: 3460px;
            font-size: 106px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2560px) and (min-height: 3840px) {
          .container {
            width: 2560px;
            height: 3840px;
            font-size: 98px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4176px) and (min-height: 3840px) {
          .container {
            width: 2784px;
            height: 3480px;
            font-size: 107px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2576px) and (min-height: 3864px) {
          .container {
            width: 2576px;
            height: 3864px;
            font-size: 99px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4200px) and (min-height: 3864px) {
          .container {
            width: 2800px;
            height: 3500px;
            font-size: 107px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2592px) and (min-height: 3888px) {
          .container {
            width: 2592px;
            height: 3888px;
            font-size: 99px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4224px) and (min-height: 3888px) {
          .container {
            width: 2816px;
            height: 3520px;
            font-size: 108px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2608px) and (min-height: 3912px) {
          .container {
            width: 2608px;
            height: 3912px;
            font-size: 100px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4248px) and (min-height: 3912px) {
          .container {
            width: 2832px;
            height: 3540px;
            font-size: 108px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2624px) and (min-height: 3936px) {
          .container {
            width: 2624px;
            height: 3936px;
            font-size: 100px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4272px) and (min-height: 3936px) {
          .container {
            width: 2848px;
            height: 3560px;
            font-size: 109px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2640px) and (min-height: 3960px) {
          .container {
            width: 2640px;
            height: 3960px;
            font-size: 101px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4320px) and (min-height: 3960px) {
          .container {
            width: 2880px;
            height: 3600px;
            font-size: 110px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2656px) and (min-height: 3984px) {
          .container {
            width: 2656px;
            height: 3984px;
            font-size: 102px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4344px) and (min-height: 3984px) {
          .container {
            width: 2896px;
            height: 3620px;
            font-size: 111px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2672px) and (min-height: 4008px) {
          .container {
            width: 2672px;
            height: 4008px;
            font-size: 102px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4368px) and (min-height: 4008px) {
          .container {
            width: 2912px;
            height: 3640px;
            font-size: 112px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2688px) and (min-height: 4032px) {
          .container {
            width: 2688px;
            height: 4032px;
            font-size: 103px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4392px) and (min-height: 4032px) {
          .container {
            width: 2928px;
            height: 3660px;
            font-size: 112px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2704px) and (min-height: 4056px) {
          .container {
            width: 2704px;
            height: 4056px;
            font-size: 104px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4416px) and (min-height: 4056px) {
          .container {
            width: 2944px;
            height: 3680px;
            font-size: 113px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2720px) and (min-height: 4080px) {
          .container {
            width: 2720px;
            height: 4080px;
            font-size: 104px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4440px) and (min-height: 4080px) {
          .container {
            width: 2960px;
            height: 3700px;
            font-size: 113px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2736px) and (min-height: 4104px) {
          .container {
            width: 2736px;
            height: 4104px;
            font-size: 105px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4464px) and (min-height: 4104px) {
          .container {
            width: 2976px;
            height: 3720px;
            font-size: 114px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2752px) and (min-height: 4128px) {
          .container {
            width: 2752px;
            height: 4128px;
            font-size: 105px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4488px) and (min-height: 4128px) {
          .container {
            width: 2992px;
            height: 3740px;
            font-size: 115px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2768px) and (min-height: 4152px) {
          .container {
            width: 2768px;
            height: 4152px;
            font-size: 106px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4512px) and (min-height: 4152px) {
          .container {
            width: 3008px;
            height: 3760px;
            font-size: 115px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2784px) and (min-height: 4176px) {
          .container {
            width: 2784px;
            height: 4176px;
            font-size: 107px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4536px) and (min-height: 4176px) {
          .container {
            width: 3024px;
            height: 3780px;
            font-size: 116px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2800px) and (min-height: 4200px) {
          .container {
            width: 2800px;
            height: 4200px;
            font-size: 107px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4560px) and (min-height: 4200px) {
          .container {
            width: 3040px;
            height: 3800px;
            font-size: 116px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2816px) and (min-height: 4224px) {
          .container {
            width: 2816px;
            height: 4224px;
            font-size: 108px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4608px) and (min-height: 4224px) {
          .container {
            width: 3072px;
            height: 3840px;
            font-size: 118px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2832px) and (min-height: 4248px) {
          .container {
            width: 2832px;
            height: 4248px;
            font-size: 108px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4632px) and (min-height: 4248px) {
          .container {
            width: 3088px;
            height: 3860px;
            font-size: 118px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2848px) and (min-height: 4272px) {
          .container {
            width: 2848px;
            height: 4272px;
            font-size: 109px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4656px) and (min-height: 4272px) {
          .container {
            width: 3104px;
            height: 3880px;
            font-size: 119px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2864px) and (min-height: 4296px) {
          .container {
            width: 2864px;
            height: 4296px;
            font-size: 110px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4680px) and (min-height: 4296px) {
          .container {
            width: 3120px;
            height: 3900px;
            font-size: 120px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2880px) and (min-height: 4320px) {
          .container {
            width: 2880px;
            height: 4320px;
            font-size: 110px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4704px) and (min-height: 4320px) {
          .container {
            width: 3136px;
            height: 3920px;
            font-size: 120px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2896px) and (min-height: 4344px) {
          .container {
            width: 2896px;
            height: 4344px;
            font-size: 111px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4728px) and (min-height: 4344px) {
          .container {
            width: 3152px;
            height: 3940px;
            font-size: 121px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2912px) and (min-height: 4368px) {
          .container {
            width: 2912px;
            height: 4368px;
            font-size: 112px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4752px) and (min-height: 4368px) {
          .container {
            width: 3168px;
            height: 3960px;
            font-size: 121px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2928px) and (min-height: 4392px) {
          .container {
            width: 2928px;
            height: 4392px;
            font-size: 112px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4776px) and (min-height: 4392px) {
          .container {
            width: 3184px;
            height: 3980px;
            font-size: 122px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2944px) and (min-height: 4416px) {
          .container {
            width: 2944px;
            height: 4416px;
            font-size: 113px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4800px) and (min-height: 4416px) {
          .container {
            width: 3200px;
            height: 4000px;
            font-size: 123px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2960px) and (min-height: 4440px) {
          .container {
            width: 2960px;
            height: 4440px;
            font-size: 113px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4824px) and (min-height: 4440px) {
          .container {
            width: 3216px;
            height: 4020px;
            font-size: 123px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2976px) and (min-height: 4464px) {
          .container {
            width: 2976px;
            height: 4464px;
            font-size: 114px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4848px) and (min-height: 4464px) {
          .container {
            width: 3232px;
            height: 4040px;
            font-size: 124px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 2992px) and (min-height: 4488px) {
          .container {
            width: 2992px;
            height: 4488px;
            font-size: 115px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4896px) and (min-height: 4488px) {
          .container {
            width: 3264px;
            height: 4080px;
            font-size: 125px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3008px) and (min-height: 4512px) {
          .container {
            width: 3008px;
            height: 4512px;
            font-size: 115px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4920px) and (min-height: 4512px) {
          .container {
            width: 3280px;
            height: 4100px;
            font-size: 126px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3024px) and (min-height: 4536px) {
          .container {
            width: 3024px;
            height: 4536px;
            font-size: 116px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4944px) and (min-height: 4536px) {
          .container {
            width: 3296px;
            height: 4120px;
            font-size: 126px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3040px) and (min-height: 4560px) {
          .container {
            width: 3040px;
            height: 4560px;
            font-size: 116px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4968px) and (min-height: 4560px) {
          .container {
            width: 3312px;
            height: 4140px;
            font-size: 127px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3056px) and (min-height: 4584px) {
          .container {
            width: 3056px;
            height: 4584px;
            font-size: 117px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 4992px) and (min-height: 4584px) {
          .container {
            width: 3328px;
            height: 4160px;
            font-size: 128px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3072px) and (min-height: 4608px) {
          .container {
            width: 3072px;
            height: 4608px;
            font-size: 118px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 5016px) and (min-height: 4608px) {
          .container {
            width: 3344px;
            height: 4180px;
            font-size: 128px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3088px) and (min-height: 4632px) {
          .container {
            width: 3088px;
            height: 4632px;
            font-size: 118px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 5040px) and (min-height: 4632px) {
          .container {
            width: 3360px;
            height: 4200px;
            font-size: 129px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3104px) and (min-height: 4656px) {
          .container {
            width: 3104px;
            height: 4656px;
            font-size: 119px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 5064px) and (min-height: 4656px) {
          .container {
            width: 3376px;
            height: 4220px;
            font-size: 129px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3120px) and (min-height: 4680px) {
          .container {
            width: 3120px;
            height: 4680px;
            font-size: 120px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 5088px) and (min-height: 4680px) {
          .container {
            width: 3392px;
            height: 4240px;
            font-size: 130px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3136px) and (min-height: 4704px) {
          .container {
            width: 3136px;
            height: 4704px;
            font-size: 120px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 5112px) and (min-height: 4704px) {
          .container {
            width: 3408px;
            height: 4260px;
            font-size: 131px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3152px) and (min-height: 4728px) {
          .container {
            width: 3152px;
            height: 4728px;
            font-size: 121px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 5136px) and (min-height: 4728px) {
          .container {
            width: 3424px;
            height: 4280px;
            font-size: 131px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3168px) and (min-height: 4752px) {
          .container {
            width: 3168px;
            height: 4752px;
            font-size: 121px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 5184px) and (min-height: 4752px) {
          .container {
            width: 3456px;
            height: 4320px;
            font-size: 132px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3184px) and (min-height: 4776px) {
          .container {
            width: 3184px;
            height: 4776px;
            font-size: 122px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 5208px) and (min-height: 4776px) {
          .container {
            width: 3472px;
            height: 4340px;
            font-size: 133px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
        @media (min-width: 3200px) and (min-height: 4800px) {
          .container {
            width: 3200px;
            height: 4800px;
            font-size: 123px;
          }
          .controls {
            display: block;
          }
          .game-height {
            height: calc(100% / 24 * 20);
          }
        }
        @media (min-width: 5232px) and (min-height: 4800px) {
          .container {
            width: 3488px;
            height: 4360px;
            font-size: 134px;
          }
          .controls {
            display: none;
          }
          .game-height {
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default GameContainer;
