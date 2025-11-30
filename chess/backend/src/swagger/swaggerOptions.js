import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  openapi: "3.0.0",

  info: {
    title: "MERN Chess User Puzzle API",
    version: "1.0.0",
    description: "Hi.",
  },

  servers: [
    {
      url: "/api/v1",
      description: "dev server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWTトークンを**Bearer [token]**形式で設定します。",
      },
    },

    // データスキーマの定義（UserPuzzleモデルなど）
    schemas: {
      // 外部ファイル（例：../src/models/UserPuzzle.js）のJSDocコメントで定義された
      // @swagger components/schemas/UserPuzzle をここに集約して使用可能にします。
    },
  },

  // グローバルなセキュリティ設定（全てのAPIにBearer認証を必須とする場合など）
  // ただし、APIごとに設定する方が柔軟です
  security: [],
};

const options = {
  swaggerDefinition,
  // 👈 JSDocコメントを読み取るファイルパスを指定
  // ここでは、プロジェクトルートからの相対パスで、routesとmodelsを読み込んでいます。
  apis: [
    path.join(__dirname, "../routes/r_puzzle.js"),
    path.join(__dirname, "../routes/r_user.js"),
    path.join(__dirname, "../routes/r_userPuzzle.js"),
    // path.join(__dirname, "./db/models/*.js"),
    // 他に必要なファイル（例：validation.jsで定義されたスキーマ）があれば追加
  ],
};

// Swagger Specification (OAS 3.0) オブジェクトを生成
export const swaggerSpec = swaggerJsdoc(options);
