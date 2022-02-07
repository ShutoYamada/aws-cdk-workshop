# About
[AWS CDK Workshop](https://cdkworkshop.com/)を参考にした`CDK`の学習用コード。
基本的には`lib`配下の`TS`ファイルを操作していく。

# `CDK CLI`インストール
まだインストールしていない場合のみ。

```shell
npm install -g aws-cdk
```

# 操作
`*`マークがついている箇所は初回のみ。

## watch
`Typescript`のコンパイルエラーが出ていないか確認する場合。

```shell
npm run watch
```

## synth
`Cloud Formation`用のテンプレート出力。

```shell
cdk synth
```

## `*`Bootstrap
デプロイに必要な一時的なファイル保持用の`S3`バケット生成。

```shell
cdk bootstrap
```

## depploy

```shell
cdk deploy
```