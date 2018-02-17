// @flow

import React from 'react';

import type { Node } from 'react';

type Props = {
  children: Node,
  outer?: Node
};

const GameContainer = ({ children, outer }: Props) => {
  return (
    <div className="outer">
      <div className="container">{children}</div>
      {outer}
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
          height: 100px;
          margin-top: -10px;
          font-size: 3px;
        }
        .controls {
          display: block;
        }
        .ctrl-side {
          display: none;
        }
        @media (min-width: 120px) and (min-height: 120px) {
          .container {
            width: 80px;
            height: 100px;
            margin-top: 0;
            font-size: 3px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 20px;
            height: 40px;
          }
        }
        @media (min-width: 96px) and (min-height: 144px) {
          .container {
            width: 96px;
            height: 120px;
            margin-top: -12px;
            font-size: 3px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 144px) and (min-height: 144px) {
          .container {
            width: 96px;
            height: 120px;
            margin-top: 0;
            font-size: 3px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 24px;
            height: 48px;
          }
        }
        @media (min-width: 112px) and (min-height: 168px) {
          .container {
            width: 112px;
            height: 140px;
            margin-top: -14px;
            font-size: 4px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 168px) and (min-height: 168px) {
          .container {
            width: 112px;
            height: 140px;
            margin-top: 0;
            font-size: 4px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 28px;
            height: 56px;
          }
        }
        @media (min-width: 128px) and (min-height: 192px) {
          .container {
            width: 128px;
            height: 160px;
            margin-top: -16px;
            font-size: 4px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 192px) and (min-height: 192px) {
          .container {
            width: 128px;
            height: 160px;
            margin-top: 0;
            font-size: 4px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 32px;
            height: 64px;
          }
        }
        @media (min-width: 144px) and (min-height: 216px) {
          .container {
            width: 144px;
            height: 180px;
            margin-top: -18px;
            font-size: 5px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 216px) and (min-height: 216px) {
          .container {
            width: 144px;
            height: 180px;
            margin-top: 0;
            font-size: 5px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 36px;
            height: 72px;
          }
        }
        @media (min-width: 160px) and (min-height: 240px) {
          .container {
            width: 160px;
            height: 200px;
            margin-top: -20px;
            font-size: 6px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 240px) and (min-height: 240px) {
          .container {
            width: 160px;
            height: 200px;
            margin-top: 0;
            font-size: 6px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 40px;
            height: 80px;
          }
        }
        @media (min-width: 176px) and (min-height: 264px) {
          .container {
            width: 176px;
            height: 220px;
            margin-top: -22px;
            font-size: 6px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 288px) and (min-height: 264px) {
          .container {
            width: 192px;
            height: 240px;
            margin-top: 0;
            font-size: 7px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 48px;
            height: 96px;
          }
        }
        @media (min-width: 192px) and (min-height: 288px) {
          .container {
            width: 192px;
            height: 240px;
            margin-top: -24px;
            font-size: 7px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 312px) and (min-height: 288px) {
          .container {
            width: 208px;
            height: 260px;
            margin-top: 0;
            font-size: 8px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 52px;
            height: 104px;
          }
        }
        @media (min-width: 208px) and (min-height: 312px) {
          .container {
            width: 208px;
            height: 260px;
            margin-top: -26px;
            font-size: 8px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 336px) and (min-height: 312px) {
          .container {
            width: 224px;
            height: 280px;
            margin-top: 0;
            font-size: 8px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 56px;
            height: 112px;
          }
        }
        @media (min-width: 224px) and (min-height: 336px) {
          .container {
            width: 224px;
            height: 280px;
            margin-top: -28px;
            font-size: 8px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 360px) and (min-height: 336px) {
          .container {
            width: 240px;
            height: 300px;
            margin-top: 0;
            font-size: 9px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 60px;
            height: 120px;
          }
        }
        @media (min-width: 240px) and (min-height: 360px) {
          .container {
            width: 240px;
            height: 300px;
            margin-top: -30px;
            font-size: 9px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 384px) and (min-height: 360px) {
          .container {
            width: 256px;
            height: 320px;
            margin-top: 0;
            font-size: 9px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 64px;
            height: 128px;
          }
        }
        @media (min-width: 256px) and (min-height: 384px) {
          .container {
            width: 256px;
            height: 320px;
            margin-top: -32px;
            font-size: 9px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 408px) and (min-height: 384px) {
          .container {
            width: 272px;
            height: 340px;
            margin-top: 0;
            font-size: 10px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 68px;
            height: 136px;
          }
        }
        @media (min-width: 272px) and (min-height: 408px) {
          .container {
            width: 272px;
            height: 340px;
            margin-top: -34px;
            font-size: 10px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 432px) and (min-height: 408px) {
          .container {
            width: 288px;
            height: 360px;
            margin-top: 0;
            font-size: 11px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 72px;
            height: 144px;
          }
        }
        @media (min-width: 288px) and (min-height: 432px) {
          .container {
            width: 288px;
            height: 360px;
            margin-top: -36px;
            font-size: 11px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 456px) and (min-height: 432px) {
          .container {
            width: 304px;
            height: 380px;
            margin-top: 0;
            font-size: 11px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 76px;
            height: 152px;
          }
        }
        @media (min-width: 304px) and (min-height: 456px) {
          .container {
            width: 304px;
            height: 380px;
            margin-top: -38px;
            font-size: 11px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 480px) and (min-height: 456px) {
          .container {
            width: 320px;
            height: 400px;
            margin-top: 0;
            font-size: 12px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 80px;
            height: 160px;
          }
        }
        @media (min-width: 320px) and (min-height: 480px) {
          .container {
            width: 320px;
            height: 400px;
            margin-top: -40px;
            font-size: 12px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 504px) and (min-height: 480px) {
          .container {
            width: 336px;
            height: 420px;
            margin-top: 0;
            font-size: 12px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 84px;
            height: 168px;
          }
        }
        @media (min-width: 336px) and (min-height: 504px) {
          .container {
            width: 336px;
            height: 420px;
            margin-top: -42px;
            font-size: 12px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 528px) and (min-height: 504px) {
          .container {
            width: 352px;
            height: 440px;
            margin-top: 0;
            font-size: 13px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 88px;
            height: 176px;
          }
        }
        @media (min-width: 352px) and (min-height: 528px) {
          .container {
            width: 352px;
            height: 440px;
            margin-top: -44px;
            font-size: 13px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 576px) and (min-height: 528px) {
          .container {
            width: 384px;
            height: 480px;
            margin-top: 0;
            font-size: 14px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 96px;
            height: 192px;
          }
        }
        @media (min-width: 368px) and (min-height: 552px) {
          .container {
            width: 368px;
            height: 460px;
            margin-top: -46px;
            font-size: 14px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 600px) and (min-height: 552px) {
          .container {
            width: 400px;
            height: 500px;
            margin-top: 0;
            font-size: 15px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 100px;
            height: 200px;
          }
        }
        @media (min-width: 384px) and (min-height: 576px) {
          .container {
            width: 384px;
            height: 480px;
            margin-top: -48px;
            font-size: 14px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 624px) and (min-height: 576px) {
          .container {
            width: 416px;
            height: 520px;
            margin-top: 0;
            font-size: 16px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 104px;
            height: 208px;
          }
        }
        @media (min-width: 400px) and (min-height: 600px) {
          .container {
            width: 400px;
            height: 500px;
            margin-top: -50px;
            font-size: 15px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 648px) and (min-height: 600px) {
          .container {
            width: 432px;
            height: 540px;
            margin-top: 0;
            font-size: 16px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 108px;
            height: 216px;
          }
        }
        @media (min-width: 416px) and (min-height: 624px) {
          .container {
            width: 416px;
            height: 520px;
            margin-top: -52px;
            font-size: 16px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 672px) and (min-height: 624px) {
          .container {
            width: 448px;
            height: 560px;
            margin-top: 0;
            font-size: 17px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 112px;
            height: 224px;
          }
        }
        @media (min-width: 432px) and (min-height: 648px) {
          .container {
            width: 432px;
            height: 540px;
            margin-top: -54px;
            font-size: 16px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 696px) and (min-height: 648px) {
          .container {
            width: 464px;
            height: 580px;
            margin-top: 0;
            font-size: 17px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 116px;
            height: 232px;
          }
        }
        @media (min-width: 448px) and (min-height: 672px) {
          .container {
            width: 448px;
            height: 560px;
            margin-top: -56px;
            font-size: 17px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 720px) and (min-height: 672px) {
          .container {
            width: 480px;
            height: 600px;
            margin-top: 0;
            font-size: 18px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 120px;
            height: 240px;
          }
        }
        @media (min-width: 464px) and (min-height: 696px) {
          .container {
            width: 464px;
            height: 580px;
            margin-top: -58px;
            font-size: 17px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 744px) and (min-height: 696px) {
          .container {
            width: 496px;
            height: 620px;
            margin-top: 0;
            font-size: 19px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 124px;
            height: 248px;
          }
        }
        @media (min-width: 480px) and (min-height: 720px) {
          .container {
            width: 480px;
            height: 600px;
            margin-top: -60px;
            font-size: 18px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 768px) and (min-height: 720px) {
          .container {
            width: 512px;
            height: 640px;
            margin-top: 0;
            font-size: 19px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 128px;
            height: 256px;
          }
        }
        @media (min-width: 496px) and (min-height: 744px) {
          .container {
            width: 496px;
            height: 620px;
            margin-top: -62px;
            font-size: 19px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 792px) and (min-height: 744px) {
          .container {
            width: 528px;
            height: 660px;
            margin-top: 0;
            font-size: 20px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 132px;
            height: 264px;
          }
        }
        @media (min-width: 512px) and (min-height: 768px) {
          .container {
            width: 512px;
            height: 640px;
            margin-top: -64px;
            font-size: 19px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 816px) and (min-height: 768px) {
          .container {
            width: 544px;
            height: 680px;
            margin-top: 0;
            font-size: 20px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 136px;
            height: 272px;
          }
        }
        @media (min-width: 528px) and (min-height: 792px) {
          .container {
            width: 528px;
            height: 660px;
            margin-top: -66px;
            font-size: 20px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 864px) and (min-height: 792px) {
          .container {
            width: 576px;
            height: 720px;
            margin-top: 0;
            font-size: 22px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 144px;
            height: 288px;
          }
        }
        @media (min-width: 544px) and (min-height: 816px) {
          .container {
            width: 544px;
            height: 680px;
            margin-top: -68px;
            font-size: 20px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 888px) and (min-height: 816px) {
          .container {
            width: 592px;
            height: 740px;
            margin-top: 0;
            font-size: 22px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 148px;
            height: 296px;
          }
        }
        @media (min-width: 560px) and (min-height: 840px) {
          .container {
            width: 560px;
            height: 700px;
            margin-top: -70px;
            font-size: 21px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 912px) and (min-height: 840px) {
          .container {
            width: 608px;
            height: 760px;
            margin-top: 0;
            font-size: 23px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 152px;
            height: 304px;
          }
        }
        @media (min-width: 576px) and (min-height: 864px) {
          .container {
            width: 576px;
            height: 720px;
            margin-top: -72px;
            font-size: 22px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 936px) and (min-height: 864px) {
          .container {
            width: 624px;
            height: 780px;
            margin-top: 0;
            font-size: 24px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 156px;
            height: 312px;
          }
        }
        @media (min-width: 592px) and (min-height: 888px) {
          .container {
            width: 592px;
            height: 740px;
            margin-top: -74px;
            font-size: 22px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 960px) and (min-height: 888px) {
          .container {
            width: 640px;
            height: 800px;
            margin-top: 0;
            font-size: 24px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 160px;
            height: 320px;
          }
        }
        @media (min-width: 608px) and (min-height: 912px) {
          .container {
            width: 608px;
            height: 760px;
            margin-top: -76px;
            font-size: 23px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 984px) and (min-height: 912px) {
          .container {
            width: 656px;
            height: 820px;
            margin-top: 0;
            font-size: 25px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 164px;
            height: 328px;
          }
        }
        @media (min-width: 624px) and (min-height: 936px) {
          .container {
            width: 624px;
            height: 780px;
            margin-top: -78px;
            font-size: 24px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1008px) and (min-height: 936px) {
          .container {
            width: 672px;
            height: 840px;
            margin-top: 0;
            font-size: 25px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 168px;
            height: 336px;
          }
        }
        @media (min-width: 640px) and (min-height: 960px) {
          .container {
            width: 640px;
            height: 800px;
            margin-top: -80px;
            font-size: 24px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1032px) and (min-height: 960px) {
          .container {
            width: 688px;
            height: 860px;
            margin-top: 0;
            font-size: 26px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 172px;
            height: 344px;
          }
        }
        @media (min-width: 656px) and (min-height: 984px) {
          .container {
            width: 656px;
            height: 820px;
            margin-top: -82px;
            font-size: 25px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1056px) and (min-height: 984px) {
          .container {
            width: 704px;
            height: 880px;
            margin-top: 0;
            font-size: 27px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 176px;
            height: 352px;
          }
        }
        @media (min-width: 672px) and (min-height: 1008px) {
          .container {
            width: 672px;
            height: 840px;
            margin-top: -84px;
            font-size: 25px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1080px) and (min-height: 1008px) {
          .container {
            width: 720px;
            height: 900px;
            margin-top: 0;
            font-size: 27px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 180px;
            height: 360px;
          }
        }
        @media (min-width: 688px) and (min-height: 1032px) {
          .container {
            width: 688px;
            height: 860px;
            margin-top: -86px;
            font-size: 26px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1104px) and (min-height: 1032px) {
          .container {
            width: 736px;
            height: 920px;
            margin-top: 0;
            font-size: 28px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 184px;
            height: 368px;
          }
        }
        @media (min-width: 704px) and (min-height: 1056px) {
          .container {
            width: 704px;
            height: 880px;
            margin-top: -88px;
            font-size: 27px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1152px) and (min-height: 1056px) {
          .container {
            width: 768px;
            height: 960px;
            margin-top: 0;
            font-size: 29px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 192px;
            height: 384px;
          }
        }
        @media (min-width: 720px) and (min-height: 1080px) {
          .container {
            width: 720px;
            height: 900px;
            margin-top: -90px;
            font-size: 27px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1176px) and (min-height: 1080px) {
          .container {
            width: 784px;
            height: 980px;
            margin-top: 0;
            font-size: 30px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 196px;
            height: 392px;
          }
        }
        @media (min-width: 736px) and (min-height: 1104px) {
          .container {
            width: 736px;
            height: 920px;
            margin-top: -92px;
            font-size: 28px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1200px) and (min-height: 1104px) {
          .container {
            width: 800px;
            height: 1000px;
            margin-top: 0;
            font-size: 30px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 200px;
            height: 400px;
          }
        }
        @media (min-width: 752px) and (min-height: 1128px) {
          .container {
            width: 752px;
            height: 940px;
            margin-top: -94px;
            font-size: 28px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1224px) and (min-height: 1128px) {
          .container {
            width: 816px;
            height: 1020px;
            margin-top: 0;
            font-size: 31px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 204px;
            height: 408px;
          }
        }
        @media (min-width: 768px) and (min-height: 1152px) {
          .container {
            width: 768px;
            height: 960px;
            margin-top: -96px;
            font-size: 29px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1248px) and (min-height: 1152px) {
          .container {
            width: 832px;
            height: 1040px;
            margin-top: 0;
            font-size: 32px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 208px;
            height: 416px;
          }
        }
        @media (min-width: 784px) and (min-height: 1176px) {
          .container {
            width: 784px;
            height: 980px;
            margin-top: -98px;
            font-size: 30px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1272px) and (min-height: 1176px) {
          .container {
            width: 848px;
            height: 1060px;
            margin-top: 0;
            font-size: 32px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 212px;
            height: 424px;
          }
        }
        @media (min-width: 800px) and (min-height: 1200px) {
          .container {
            width: 800px;
            height: 1000px;
            margin-top: -100px;
            font-size: 30px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1296px) and (min-height: 1200px) {
          .container {
            width: 864px;
            height: 1080px;
            margin-top: 0;
            font-size: 33px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 216px;
            height: 432px;
          }
        }
        @media (min-width: 816px) and (min-height: 1224px) {
          .container {
            width: 816px;
            height: 1020px;
            margin-top: -102px;
            font-size: 31px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1320px) and (min-height: 1224px) {
          .container {
            width: 880px;
            height: 1100px;
            margin-top: 0;
            font-size: 33px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 220px;
            height: 440px;
          }
        }
        @media (min-width: 832px) and (min-height: 1248px) {
          .container {
            width: 832px;
            height: 1040px;
            margin-top: -104px;
            font-size: 32px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1344px) and (min-height: 1248px) {
          .container {
            width: 896px;
            height: 1120px;
            margin-top: 0;
            font-size: 34px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 224px;
            height: 448px;
          }
        }
        @media (min-width: 848px) and (min-height: 1272px) {
          .container {
            width: 848px;
            height: 1060px;
            margin-top: -106px;
            font-size: 32px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1368px) and (min-height: 1272px) {
          .container {
            width: 912px;
            height: 1140px;
            margin-top: 0;
            font-size: 35px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 228px;
            height: 456px;
          }
        }
        @media (min-width: 864px) and (min-height: 1296px) {
          .container {
            width: 864px;
            height: 1080px;
            margin-top: -108px;
            font-size: 33px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1392px) and (min-height: 1296px) {
          .container {
            width: 928px;
            height: 1160px;
            margin-top: 0;
            font-size: 35px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 232px;
            height: 464px;
          }
        }
        @media (min-width: 880px) and (min-height: 1320px) {
          .container {
            width: 880px;
            height: 1100px;
            margin-top: -110px;
            font-size: 33px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1440px) and (min-height: 1320px) {
          .container {
            width: 960px;
            height: 1200px;
            margin-top: 0;
            font-size: 36px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 240px;
            height: 480px;
          }
        }
        @media (min-width: 896px) and (min-height: 1344px) {
          .container {
            width: 896px;
            height: 1120px;
            margin-top: -112px;
            font-size: 34px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1464px) and (min-height: 1344px) {
          .container {
            width: 976px;
            height: 1220px;
            margin-top: 0;
            font-size: 37px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 244px;
            height: 488px;
          }
        }
        @media (min-width: 912px) and (min-height: 1368px) {
          .container {
            width: 912px;
            height: 1140px;
            margin-top: -114px;
            font-size: 35px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1488px) and (min-height: 1368px) {
          .container {
            width: 992px;
            height: 1240px;
            margin-top: 0;
            font-size: 38px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 248px;
            height: 496px;
          }
        }
        @media (min-width: 928px) and (min-height: 1392px) {
          .container {
            width: 928px;
            height: 1160px;
            margin-top: -116px;
            font-size: 35px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1512px) and (min-height: 1392px) {
          .container {
            width: 1008px;
            height: 1260px;
            margin-top: 0;
            font-size: 38px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 252px;
            height: 504px;
          }
        }
        @media (min-width: 944px) and (min-height: 1416px) {
          .container {
            width: 944px;
            height: 1180px;
            margin-top: -118px;
            font-size: 36px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1536px) and (min-height: 1416px) {
          .container {
            width: 1024px;
            height: 1280px;
            margin-top: 0;
            font-size: 39px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 256px;
            height: 512px;
          }
        }
        @media (min-width: 960px) and (min-height: 1440px) {
          .container {
            width: 960px;
            height: 1200px;
            margin-top: -120px;
            font-size: 36px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1560px) and (min-height: 1440px) {
          .container {
            width: 1040px;
            height: 1300px;
            margin-top: 0;
            font-size: 40px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 260px;
            height: 520px;
          }
        }
        @media (min-width: 976px) and (min-height: 1464px) {
          .container {
            width: 976px;
            height: 1220px;
            margin-top: -122px;
            font-size: 37px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1584px) and (min-height: 1464px) {
          .container {
            width: 1056px;
            height: 1320px;
            margin-top: 0;
            font-size: 40px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 264px;
            height: 528px;
          }
        }
        @media (min-width: 992px) and (min-height: 1488px) {
          .container {
            width: 992px;
            height: 1240px;
            margin-top: -124px;
            font-size: 38px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1608px) and (min-height: 1488px) {
          .container {
            width: 1072px;
            height: 1340px;
            margin-top: 0;
            font-size: 41px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 268px;
            height: 536px;
          }
        }
        @media (min-width: 1008px) and (min-height: 1512px) {
          .container {
            width: 1008px;
            height: 1260px;
            margin-top: -126px;
            font-size: 38px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1632px) and (min-height: 1512px) {
          .container {
            width: 1088px;
            height: 1360px;
            margin-top: 0;
            font-size: 41px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 272px;
            height: 544px;
          }
        }
        @media (min-width: 1024px) and (min-height: 1536px) {
          .container {
            width: 1024px;
            height: 1280px;
            margin-top: -128px;
            font-size: 39px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1656px) and (min-height: 1536px) {
          .container {
            width: 1104px;
            height: 1380px;
            margin-top: 0;
            font-size: 42px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 276px;
            height: 552px;
          }
        }
        @media (min-width: 1040px) and (min-height: 1560px) {
          .container {
            width: 1040px;
            height: 1300px;
            margin-top: -130px;
            font-size: 40px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1680px) and (min-height: 1560px) {
          .container {
            width: 1120px;
            height: 1400px;
            margin-top: 0;
            font-size: 43px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 280px;
            height: 560px;
          }
        }
        @media (min-width: 1056px) and (min-height: 1584px) {
          .container {
            width: 1056px;
            height: 1320px;
            margin-top: -132px;
            font-size: 40px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1728px) and (min-height: 1584px) {
          .container {
            width: 1152px;
            height: 1440px;
            margin-top: 0;
            font-size: 44px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 288px;
            height: 576px;
          }
        }
        @media (min-width: 1072px) and (min-height: 1608px) {
          .container {
            width: 1072px;
            height: 1340px;
            margin-top: -134px;
            font-size: 41px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1752px) and (min-height: 1608px) {
          .container {
            width: 1168px;
            height: 1460px;
            margin-top: 0;
            font-size: 44px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 292px;
            height: 584px;
          }
        }
        @media (min-width: 1088px) and (min-height: 1632px) {
          .container {
            width: 1088px;
            height: 1360px;
            margin-top: -136px;
            font-size: 41px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1776px) and (min-height: 1632px) {
          .container {
            width: 1184px;
            height: 1480px;
            margin-top: 0;
            font-size: 45px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 296px;
            height: 592px;
          }
        }
        @media (min-width: 1104px) and (min-height: 1656px) {
          .container {
            width: 1104px;
            height: 1380px;
            margin-top: -138px;
            font-size: 42px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1800px) and (min-height: 1656px) {
          .container {
            width: 1200px;
            height: 1500px;
            margin-top: 0;
            font-size: 46px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 300px;
            height: 600px;
          }
        }
        @media (min-width: 1120px) and (min-height: 1680px) {
          .container {
            width: 1120px;
            height: 1400px;
            margin-top: -140px;
            font-size: 43px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1824px) and (min-height: 1680px) {
          .container {
            width: 1216px;
            height: 1520px;
            margin-top: 0;
            font-size: 46px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 304px;
            height: 608px;
          }
        }
        @media (min-width: 1136px) and (min-height: 1704px) {
          .container {
            width: 1136px;
            height: 1420px;
            margin-top: -142px;
            font-size: 43px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1848px) and (min-height: 1704px) {
          .container {
            width: 1232px;
            height: 1540px;
            margin-top: 0;
            font-size: 47px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 308px;
            height: 616px;
          }
        }
        @media (min-width: 1152px) and (min-height: 1728px) {
          .container {
            width: 1152px;
            height: 1440px;
            margin-top: -144px;
            font-size: 44px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1872px) and (min-height: 1728px) {
          .container {
            width: 1248px;
            height: 1560px;
            margin-top: 0;
            font-size: 48px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 312px;
            height: 624px;
          }
        }
        @media (min-width: 1168px) and (min-height: 1752px) {
          .container {
            width: 1168px;
            height: 1460px;
            margin-top: -146px;
            font-size: 44px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1896px) and (min-height: 1752px) {
          .container {
            width: 1264px;
            height: 1580px;
            margin-top: 0;
            font-size: 48px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 316px;
            height: 632px;
          }
        }
        @media (min-width: 1184px) and (min-height: 1776px) {
          .container {
            width: 1184px;
            height: 1480px;
            margin-top: -148px;
            font-size: 45px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1920px) and (min-height: 1776px) {
          .container {
            width: 1280px;
            height: 1600px;
            margin-top: 0;
            font-size: 49px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 320px;
            height: 640px;
          }
        }
        @media (min-width: 1200px) and (min-height: 1800px) {
          .container {
            width: 1200px;
            height: 1500px;
            margin-top: -150px;
            font-size: 46px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1944px) and (min-height: 1800px) {
          .container {
            width: 1296px;
            height: 1620px;
            margin-top: 0;
            font-size: 49px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 324px;
            height: 648px;
          }
        }
        @media (min-width: 1216px) and (min-height: 1824px) {
          .container {
            width: 1216px;
            height: 1520px;
            margin-top: -152px;
            font-size: 46px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 1968px) and (min-height: 1824px) {
          .container {
            width: 1312px;
            height: 1640px;
            margin-top: 0;
            font-size: 50px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 328px;
            height: 656px;
          }
        }
        @media (min-width: 1232px) and (min-height: 1848px) {
          .container {
            width: 1232px;
            height: 1540px;
            margin-top: -154px;
            font-size: 47px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2016px) and (min-height: 1848px) {
          .container {
            width: 1344px;
            height: 1680px;
            margin-top: 0;
            font-size: 51px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 336px;
            height: 672px;
          }
        }
        @media (min-width: 1248px) and (min-height: 1872px) {
          .container {
            width: 1248px;
            height: 1560px;
            margin-top: -156px;
            font-size: 48px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2040px) and (min-height: 1872px) {
          .container {
            width: 1360px;
            height: 1700px;
            margin-top: 0;
            font-size: 52px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 340px;
            height: 680px;
          }
        }
        @media (min-width: 1264px) and (min-height: 1896px) {
          .container {
            width: 1264px;
            height: 1580px;
            margin-top: -158px;
            font-size: 48px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2064px) and (min-height: 1896px) {
          .container {
            width: 1376px;
            height: 1720px;
            margin-top: 0;
            font-size: 52px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 344px;
            height: 688px;
          }
        }
        @media (min-width: 1280px) and (min-height: 1920px) {
          .container {
            width: 1280px;
            height: 1600px;
            margin-top: -160px;
            font-size: 49px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2088px) and (min-height: 1920px) {
          .container {
            width: 1392px;
            height: 1740px;
            margin-top: 0;
            font-size: 53px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 348px;
            height: 696px;
          }
        }
        @media (min-width: 1296px) and (min-height: 1944px) {
          .container {
            width: 1296px;
            height: 1620px;
            margin-top: -162px;
            font-size: 49px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2112px) and (min-height: 1944px) {
          .container {
            width: 1408px;
            height: 1760px;
            margin-top: 0;
            font-size: 54px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 352px;
            height: 704px;
          }
        }
        @media (min-width: 1312px) and (min-height: 1968px) {
          .container {
            width: 1312px;
            height: 1640px;
            margin-top: -164px;
            font-size: 50px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2136px) and (min-height: 1968px) {
          .container {
            width: 1424px;
            height: 1780px;
            margin-top: 0;
            font-size: 54px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 356px;
            height: 712px;
          }
        }
        @media (min-width: 1328px) and (min-height: 1992px) {
          .container {
            width: 1328px;
            height: 1660px;
            margin-top: -166px;
            font-size: 51px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2160px) and (min-height: 1992px) {
          .container {
            width: 1440px;
            height: 1800px;
            margin-top: 0;
            font-size: 55px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 360px;
            height: 720px;
          }
        }
        @media (min-width: 1344px) and (min-height: 2016px) {
          .container {
            width: 1344px;
            height: 1680px;
            margin-top: -168px;
            font-size: 51px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2184px) and (min-height: 2016px) {
          .container {
            width: 1456px;
            height: 1820px;
            margin-top: 0;
            font-size: 56px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 364px;
            height: 728px;
          }
        }
        @media (min-width: 1360px) and (min-height: 2040px) {
          .container {
            width: 1360px;
            height: 1700px;
            margin-top: -170px;
            font-size: 52px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2208px) and (min-height: 2040px) {
          .container {
            width: 1472px;
            height: 1840px;
            margin-top: 0;
            font-size: 56px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 368px;
            height: 736px;
          }
        }
        @media (min-width: 1376px) and (min-height: 2064px) {
          .container {
            width: 1376px;
            height: 1720px;
            margin-top: -172px;
            font-size: 52px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2232px) and (min-height: 2064px) {
          .container {
            width: 1488px;
            height: 1860px;
            margin-top: 0;
            font-size: 57px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 372px;
            height: 744px;
          }
        }
        @media (min-width: 1392px) and (min-height: 2088px) {
          .container {
            width: 1392px;
            height: 1740px;
            margin-top: -174px;
            font-size: 53px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2256px) and (min-height: 2088px) {
          .container {
            width: 1504px;
            height: 1880px;
            margin-top: 0;
            font-size: 57px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 376px;
            height: 752px;
          }
        }
        @media (min-width: 1408px) and (min-height: 2112px) {
          .container {
            width: 1408px;
            height: 1760px;
            margin-top: -176px;
            font-size: 54px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2304px) and (min-height: 2112px) {
          .container {
            width: 1536px;
            height: 1920px;
            margin-top: 0;
            font-size: 59px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 384px;
            height: 768px;
          }
        }
        @media (min-width: 1424px) and (min-height: 2136px) {
          .container {
            width: 1424px;
            height: 1780px;
            margin-top: -178px;
            font-size: 54px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2328px) and (min-height: 2136px) {
          .container {
            width: 1552px;
            height: 1940px;
            margin-top: 0;
            font-size: 59px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 388px;
            height: 776px;
          }
        }
        @media (min-width: 1440px) and (min-height: 2160px) {
          .container {
            width: 1440px;
            height: 1800px;
            margin-top: -180px;
            font-size: 55px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2352px) and (min-height: 2160px) {
          .container {
            width: 1568px;
            height: 1960px;
            margin-top: 0;
            font-size: 60px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 392px;
            height: 784px;
          }
        }
        @media (min-width: 1456px) and (min-height: 2184px) {
          .container {
            width: 1456px;
            height: 1820px;
            margin-top: -182px;
            font-size: 56px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2376px) and (min-height: 2184px) {
          .container {
            width: 1584px;
            height: 1980px;
            margin-top: 0;
            font-size: 60px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 396px;
            height: 792px;
          }
        }
        @media (min-width: 1472px) and (min-height: 2208px) {
          .container {
            width: 1472px;
            height: 1840px;
            margin-top: -184px;
            font-size: 56px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2400px) and (min-height: 2208px) {
          .container {
            width: 1600px;
            height: 2000px;
            margin-top: 0;
            font-size: 61px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 400px;
            height: 800px;
          }
        }
        @media (min-width: 1488px) and (min-height: 2232px) {
          .container {
            width: 1488px;
            height: 1860px;
            margin-top: -186px;
            font-size: 57px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2424px) and (min-height: 2232px) {
          .container {
            width: 1616px;
            height: 2020px;
            margin-top: 0;
            font-size: 62px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 404px;
            height: 808px;
          }
        }
        @media (min-width: 1504px) and (min-height: 2256px) {
          .container {
            width: 1504px;
            height: 1880px;
            margin-top: -188px;
            font-size: 57px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2448px) and (min-height: 2256px) {
          .container {
            width: 1632px;
            height: 2040px;
            margin-top: 0;
            font-size: 62px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 408px;
            height: 816px;
          }
        }
        @media (min-width: 1520px) and (min-height: 2280px) {
          .container {
            width: 1520px;
            height: 1900px;
            margin-top: -190px;
            font-size: 58px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2472px) and (min-height: 2280px) {
          .container {
            width: 1648px;
            height: 2060px;
            margin-top: 0;
            font-size: 63px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 412px;
            height: 824px;
          }
        }
        @media (min-width: 1536px) and (min-height: 2304px) {
          .container {
            width: 1536px;
            height: 1920px;
            margin-top: -192px;
            font-size: 59px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2496px) and (min-height: 2304px) {
          .container {
            width: 1664px;
            height: 2080px;
            margin-top: 0;
            font-size: 64px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 416px;
            height: 832px;
          }
        }
        @media (min-width: 1552px) and (min-height: 2328px) {
          .container {
            width: 1552px;
            height: 1940px;
            margin-top: -194px;
            font-size: 59px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2520px) and (min-height: 2328px) {
          .container {
            width: 1680px;
            height: 2100px;
            margin-top: 0;
            font-size: 64px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 420px;
            height: 840px;
          }
        }
        @media (min-width: 1568px) and (min-height: 2352px) {
          .container {
            width: 1568px;
            height: 1960px;
            margin-top: -196px;
            font-size: 60px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2544px) and (min-height: 2352px) {
          .container {
            width: 1696px;
            height: 2120px;
            margin-top: 0;
            font-size: 65px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 424px;
            height: 848px;
          }
        }
        @media (min-width: 1584px) and (min-height: 2376px) {
          .container {
            width: 1584px;
            height: 1980px;
            margin-top: -198px;
            font-size: 60px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2592px) and (min-height: 2376px) {
          .container {
            width: 1728px;
            height: 2160px;
            margin-top: 0;
            font-size: 66px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 432px;
            height: 864px;
          }
        }
        @media (min-width: 1600px) and (min-height: 2400px) {
          .container {
            width: 1600px;
            height: 2000px;
            margin-top: -200px;
            font-size: 61px;
          }
          .controls {
            display: block;
          }
          .ctrl-side {
            display: none;
          }
        }
        @media (min-width: 2616px) and (min-height: 2400px) {
          .container {
            width: 1744px;
            height: 2180px;
            margin-top: 0;
            font-size: 67px;
          }
          .controls {
            display: none;
          }
          .ctrl-side {
            display: block;
            width: 436px;
            height: 872px;
          }
        }
      `}</style>
    </div>
  );
};

export default GameContainer;
