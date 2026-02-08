import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { ChessboardComponent } from "../components/chessboard_starting_pos.jsx";

export function AboutJP() {
  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>

        <br />
        <div className={styles.About_text}>
          <h1>MERNスタック チェスアプリ 概要</h1>
          <h2>
            Githubリンク: <br />
            https://github.com/Kappa5400/mern_chess
            <br />
          </h2>
          <h2>イントロダクション</h2>
          <p>
            本プロジェクトは、Digital
            Oceanにデプロイされたチェスアプリのリポジトリです。
            UIの構築だけでなく、実用的なCI/CDパイプラインを構築している点が特徴です。
            GitHubへプッシュするたびに、コードのテストと静的解析（Lint）が自動実行され、フロントエンドとバックエンドのDockerイメージが生成されます。
            その後、サーバー側のセルフホスト型GitHub
            Runnerがイメージをプルし、デプロイまでを自動で行います。
            テストに関しては、サービスレイヤーの各ユニットテスト（正常系・異常系）および全APIエンドポイントの結合テストを実装しています。
            主な機能：アカウント作成・ログイン、Lichess
            APIからのデイリーパズル自動取得と保存、直近10件のパズル表示、スコアシステム（ログイン中に解決でポイント付与）、ランキング表示、ユーザー独自のパズル作成・閲覧・削除。
            このアプリは、私のソフトウェアエンジニアとしてのスキルを証明するために開発しました。詳細は以下の通りです。
          </p>

          <h2>プロジェクト詳細：システムアーキテクチャ</h2>
          <p>
            本アプリは、フロントエンドとバックエンドを完全に分離したクライアント・サーバーアーキテクチャで構築されています。
            バックエンドにはMongoDBを採用し、サービスレイヤーとルーティングレイヤーで構成されています。
            また、データバリデーションや認証のためのミドルウェア、テスト環境、ロギングユーティリティ、自動スクリプトを含んでいます。
            フロントエンドからはReact
            Hooksまたはコンポーネント経由でAPIハンドラー層にアクセスします。
            また、認証コンテキストを使用してトークン管理を行っています。
          </p>
          <h3>使用パッケージ</h3>
          <p>
            セキュリティ: bcrypt, express-jwt, express-mongo-sanitize, joi,
            helmet, jsonwebtoken <br />
            ユーティリティ: axios, dotenv, compression, cors, cron, mongoose,
            morgan, winston, swagger, eslint, cross-env <br />
            テスト: jest, mongodb-memory-server, supertest <br />
            フロントエンド: React, Vite, Chess.js, react-chessboard, tanstack,
            jwt-decode, react-router-dom
          </p>

          <h3>パッケージ解説</h3>
          <h4>セキュリティ</h4>
          <p>
            bcrypt: パスワードを暗号化（ハッシュ化）するためのパッケージ。
            <br />
            express-jwt / express-mongo-sanitize:
            MongoDBへの注入攻撃（インジェクション）を防ぐミッドウェア。
            <br />
            joi: 入力データのバリデーション用ミドルウェア。
            <br />
            helmet: HTTPヘッダーを設定し、セキュリティを強化するミドルウェア。
            <br />
            jsonwebtoken: セッション認証用のJSON Web Token。
          </p>

          <h4>ユーティリティ</h4>
          <p>
            axios: LichessのパズルAPIへHTTP GETリクエストを送るために使用。
            <br />
            compression: HTTPレスポンスを圧縮し、パフォーマンスを向上。
            <br />
            cors:
            クロスオリジンリソース共有を設定し、フロントエンドからAPIへのアクセスを許可。
            <br />
            cron:
            Lichessパズルを自動取得するためのスクリプト実行に使用。パズル更新が不定期なため、1日2回（朝・晩）チェックを行い、重複がない場合のみDBに保存します。
            （実行パス: chess/backend/src/service/jobs）
            <br />
            mongoose: MongoDB操作のためのODM（Object Data Modeling）。
            <br />
            morgan / winston: HTTPリクエストのログ出力およびシステムログの管理。
            <br />
            swagger: APIドキュメントの自動生成。
            <br />
            eslint: JavaScriptコードの品質管理（リンター）。
            <br />
            cross-env: 環境変数をOSに依存せず設定するためのツール。
          </p>

          <h4>テスト</h4>
          <p>
            Jest: ユニットテストおよび結合テストに使用したテストフレームワーク。
            <br />
            mongodb-memory-server:
            テスト時に実DBを汚さないよう、メモリ上で動作するDBをモックとして使用。
            <br />
            supertest: APIの結合テストおよびE2Eテスト用のパッケージ。
          </p>

          <h4>フロントエンド</h4>
          <p>
            React / Vite: フロントエンドフレームワークおよびビルドツール。
            <br />
            Chess.js: チェスのゲームロジック（ルール判定など）を制御。
            <br />
            react-chessboard:
            盤面をUIに表示するコンポーネント。Chess.jsと連携して動作。
            <br />
            tanstack (React Query): 非同期データの取得・キャッシュ・同期を管理。
            <br />
            jwt-decode:
            バックエンドで生成されたJWTをデコードし、セッションの有効性を確認。
            <br />
            react-router-dom: React内での画面遷移（ルーティング）を管理。
          </p>

          <br />
          <h3>ファイル構成</h3>
          <h4>バックエンド</h4>
          <p>
            | mern_chess/chess/src/ <br />
            ├── __tests__/ # ユニットテストおよび結合テスト <br />
            ├── db/ # DB初期化スクリプトとモデル定義 <br />
            ├── middleware/ # joiバリデーションとJWT認証 <br />
            ├── routes/ # ルーティングロジック <br />
            ├── service/ # ビジネスロジック <br />
            | └── jobs/ # cronジョブスクリプト <br />
            ├── swagger/ # Swagger API定義ファイル <br />
            ├── tests/ # テストのセットアップおよび破棄設定 <br />
            ├── utils/ # Winstonロギング設定 <br />
            | app.js # エントリーポイント <br />| server.js # サーバー設定
          </p>

          <h4>フロントエンド</h4>
          <p>
            | mern_chess/chess/frontend/src/ <br />
            ├── api/ # API通信の定義 <br />
            ├── components/ # Reactコンポーネント <br />
            ├── contexts/ # 認証などのコンテキスト <br />
            ├── hooks/ # API呼び出し等のカスタムフック <br />
            ├── pages/ # ページテンプレート <br />
            | App.jsx # ルーティング設定 <br />| main.jsx # エントリーポイント
          </p>

          <h2>バックエンド詳細</h2>
          <p>
            バックエンドは「DBモデル ⇄ サービス ⇄
            ルート」の標準的なパターンに従い、バリデーションとロギングのミドルウェアを組み込んでいます。
            ロジックは、ユーザー認証、パズル取得、ユーザー作成パズルの3つに分割して管理。
            ユーザー作成パズルについてはCRUD機能を備えており、認証済みユーザーは自身のパズルの作成・削除が可能です（閲覧は未認証でも可能）。
            DBサイズを適切に保つため、古いパズルを自動削除する仕組みも導入しています。
          </p>

          <h2>セキュリティ</h2>
          <p>
            JWTを用いてセッション中のトークンを追跡し、認証が必要なアクションを制御しています。
            パスワードはDB保存前にハッシュ化。ユーザーからの入力はすべてサニタイズ（無害化）され、joiスキーマによって型と形式が厳密に検証されます。
            Webサイトとして期待される標準的なセキュリティ対策を実装しています。
          </p>

          <h2>フロントエンド詳細</h2>
          <p>
            Reactのコンポーネントベースの構造を採用し、「Pages ⇄ Components ⇄
            Hooks ⇄ API」という明確なデータフローを構築しました。
            チェスのロジックにはChess.jsとreact-chessboardを使用していますが、パズル作成時の位置情報入力などの独自ロジックは自前で実装しています。
            ログイン状態に応じた動的なUI変更（作成ボタンの表示・非表示など）や、スコアボード表示機能を備えています。
          </p>

          <h2>テスト、CI/CD、デプロイ</h2>
          <h3>テスト</h3>
          <p>
            Jestを用いてユニットテストと結合テストを実施しています。
            ビジネスロジックの各関数に対して正常・異常の両パターンをテストし、APIエンドポイントが正しくデータを送受信できることを保証しています。
            これにより、コード変更時のデグレ（不具合の再発）を最小限に抑えています。
          </p>
          <h3>CI/CD</h3>
          <p>
            GitHub Actionsを利用し、プッシュごとに自動テストとリントを実行。
            テスト通過後にDockerイメージをビルドし、サーバー側のGitHub
            Runner経由で自動デプロイされるパイプラインを構築しました。
            この一連の流れにより、摩擦のない継続的デリバリー（Frictionless
            CI/CD）を実現しています。
          </p>
          <h3>デプロイ</h3>
          <p>
            Digital OceanのDroplet上でホスト。CloudflareによるIP秘匿化とDigital
            Oceanのファイアウォールを組み合わせることで、外部攻撃（DDoS等）から保護された安全な環境を構築しています。
          </p>
        </div>
      </main>
    </div>
  );
}
