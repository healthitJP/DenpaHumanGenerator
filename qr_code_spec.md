# QRコードの仕様と仕組み

## 1. QRコードとは
QRコード（Quick Response Code）は、株式会社デンソーウェーブによって1994年に開発された2次元バーコードです。
高速読み取りと大容量データ保持を特徴とし、現在では世界中で広く使用されています。

## 2. 基本仕様

### 2.1 サイズ
- 最小サイズ: 21×21モジュール
- 最大サイズ: 177×177モジュール
- 4モジュールごとにサイズが増加

### 2.2 データ容量
以下のデータタイプを混在して格納可能：
- 数字のみ: 最大7,089文字
- 英数字: 最大4,296文字
- バイナリ（8ビット）: 最大2,953バイト
- 漢字: 最大1,817文字

### 2.3 エラー訂正機能
Reed-Solomon符号を使用した4段階のエラー訂正レベル：
- レベルL: 約7%のコードワードを復元可能
- レベルM: 約15%のコードワードを復元可能
- レベルQ: 約25%のコードワードを復元可能
- レベルH: 約30%のコードワードを復元可能

## 3. 技術的な仕組み

### 3.1 データエンコーディング
1. データ解析：入力データのタイプを判定
2. データ変換：バイナリデータに変換
3. エラー訂正コード生成：Reed-Solomon符号を使用
4. データ配置：シンボルパターンの生成
5. マスクパターン適用：読み取りやすさの最適化

### 3.2 フォーマット情報
- エラー訂正レベルとマスクパターンの情報を記録
- BCH符号による保護（15,5）を実装
- 2つの完全なコピーを各QRシンボルに含む

### 3.3 構造的な特徴
- 位置検出パターン：3つの大きな四角（左上、右上、左下）
- タイミングパターン：位置合わせ用の黒白パターン
- 位置合わせパターン：大きなシンボル用の補助パターン
- クワイエットゾーン：シンボル周囲の余白

## 4. 標準化

### 4.1 主な規格
- 1997年10月：AIM International標準化
- 1999年1月：JIS規格（JIS X 0510）
- 2000年6月：ISO国際規格（ISO/IEC18004）
- 2015年2月：ISO/IEC 18004:2015（最新版）

### 4.2 特許・ライセンス
- デンソーウェーブは特許権を保有
- 標準化されたQRコードに関しては特許権を行使しない方針
- 誰でも自由に使用可能

## 5. 応用と特徴
- 高速読み取り性能
- 360度どの角度からでも読み取り可能
- 汚れや破損に強い（エラー訂正機能）
- 構造的連結機能：最大16分割まで対応
- 直接マーキングに対応（製品への直接印字）
- 暗号化やセキュリティ機能の実装が可能

## 6. 生成時の注意点
- 適切なエラー訂正レベルの選択
- 十分なクワイエットゾーンの確保
- 適切なモジュールサイズの設定
- コントラストの確保
- 用途に応じた最適なバージョン選択

## 8. QRコード生成アプリケーションの設計

### 8.1 使用技術スタック
- **フロントエンド**
  - Vite: 高速な開発環境の構築
  - React: UIコンポーネントの実装
  - TypeScript: 型安全な開発
  - ShadcnUI: モダンなUIコンポーネント
  - TailwindCSS: ユーティリティファーストなスタイリング

- **QRコード生成**
  - qrcode.react: 基本的なQRコード生成
    - SVGまたはCanvas形式での出力
    - 高いパフォーマンス
    - Reactとの親和性
  - qr-code-styling: 高度なカスタマイズ
    - ロゴの追加
    - デザインテンプレート
    - アニメーション効果

- **開発ツール**
  - ESLint: コード品質の維持
  - Prettier: コードフォーマット
  - Vitest: ユニットテスト
  - Storybook: UIコンポーネントの開発・テスト

### 8.2 主要機能と実装詳細
1. **QRコード生成設定**
   ```typescript
   // データタイプの定義
   type DataType = 'text' | 'url' | 'tel' | 'email' | 'vcard';
   
   interface VCardData {
     firstName: string;
     lastName: string;
     organization?: string;
     title?: string;
     email?: string;
     phone?: string;
     address?: string;
     url?: string;
   }

   // 入力データの型定義
   interface QRInputData {
     type: DataType;
     content: string | VCardData;
   }

   // QRコード設定の型定義（更新版）
   interface QRCodeConfig {
     value: string;
     errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
     model: 1 | 2;
     size: number;
     fgColor: string;
     bgColor: string;
     includeMargin: boolean;
     renderAs: 'svg' | 'canvas';
     imageSettings?: {
       src: string;
       height: number;
       width: number;
       excavate: boolean;
     };
   }
   ```

2. **データバリデーション**
   ```typescript
   interface ValidationRules {
     [key in DataType]: {
       maxLength: number;
       pattern?: RegExp;
       validate: (value: string) => boolean;
     }
   }

   const validationRules: ValidationRules = {
     text: {
       maxLength: 2953,
       validate: (value) => value.length <= 2953
     },
     url: {
       maxLength: 2953,
       pattern: /^https?:\/\/.+/,
       validate: (value) => /^https?:\/\/.+/.test(value)
     },
     // ... 他のルール
   };
   ```

3. **エラーハンドリング**
   ```typescript
   type QRCodeError = 
     | { type: 'INVALID_INPUT'; message: string }
     | { type: 'GENERATION_FAILED'; message: string }
     | { type: 'EXPORT_FAILED'; message: string };

   interface QRCodeState {
     config: QRCodeConfig;
     input: QRInputData;
     error: QRCodeError | null;
     isGenerating: boolean;
     isExporting: boolean;
   }
   ```

4. **カスタムフック**
   ```typescript
   // QRコード生成フック
   const useQRCode = (config: QRCodeConfig) => {
     const [error, setError] = useState<QRCodeError | null>(null);
     const [isGenerating, setIsGenerating] = useState(false);
     
     // 生成処理
     const generate = useCallback(async () => {
       setIsGenerating(true);
       try {
         // 実装
       } catch (e) {
         setError({ type: 'GENERATION_FAILED', message: e.message });
       } finally {
         setIsGenerating(false);
       }
     }, [config]);

     return { error, isGenerating, generate };
   };

   // データ変換フック
   const useQRDataConverter = (input: QRInputData) => {
     // 各データタイプごとのQRコード形式への変換ロジック
   };
   ```

### 8.3 コンポーネント設計（更新版）
```typescript
// メインコンポーネント構成
- App
  |- QRCodeGenerator
     |- ConfigPanel（設定パネル）
     |  |- ErrorCorrectionSelect
     |  |- ModelSelect
     |  |- DataTypeSelect
     |  |- DataInputForm
     |  |  |- TextInput
     |  |  |- URLInput
     |  |  |- TelInput
     |  |  |- EmailInput
     |  |  |- VCardForm
     |  |- AppearanceSettings
     |     |- ColorPicker
     |     |- SizeController
     |     |- LogoUploader
     |
     |- PreviewPanel（プレビューパネル）
     |  |- QRCodeDisplay
     |  |- ValidationStatus
     |  |- ErrorDisplay
     |
     |- ExportPanel（出力パネル）
        |- FormatSelect
        |- SizeInput
        |- DownloadButton
        |- ShareButton
```

### 8.4 状態管理（更新版）
```typescript
// Contextの定義
interface QRCodeContextType {
  state: QRCodeState;
  dispatch: React.Dispatch<QRCodeAction>;
}

type QRCodeAction =
  | { type: 'SET_CONFIG'; payload: Partial<QRCodeConfig> }
  | { type: 'SET_INPUT'; payload: QRInputData }
  | { type: 'SET_ERROR'; payload: QRCodeError | null }
  | { type: 'START_GENERATING' }
  | { type: 'FINISH_GENERATING' }
  | { type: 'RESET' };

// Reducerの実装
const qrCodeReducer = (state: QRCodeState, action: QRCodeAction): QRCodeState => {
  switch (action.type) {
    // 実装
  }
};
```

### 8.5 実装の注意点（更新版）
1. **パフォーマンス**
   - `useMemo`と`useCallback`の適切な使用
   - 大きなQRコード生成時の非同期処理
   - Suspenseを使用したローディング処理
   - Web Workerでの重い処理の実行

2. **エラーハンドリング**
   - 入力値の事前バリデーション
   - QRコード生成時のエラー処理
   - エクスポート時のファイル形式チェック
   - エラーバウンダリの実装

3. **アクセシビリティ**
   - WAI-ARIAの実装
   - フォーカス管理
   - スクリーンリーダー対応
   - キーボードナビゲーション

4. **テスト計画**
   ```typescript
   // ユニットテスト例
   describe('QRCodeGenerator', () => {
     test('validates input correctly', () => {});
     test('generates QR code with correct config', () => {});
     test('handles errors appropriately', () => {});
   });
   ```

### 8.6 デプロイメント
1. **ビルド設定**
   ```javascript
   // vite.config.ts
   export default defineConfig({
     build: {
       target: 'es2015',
       minify: 'terser',
       sourcemap: true
     },
     // その他の設定
   });
   ```

2. **環境変数**
   ```typescript
   interface Env {
     VITE_MAX_QR_SIZE: number;
     VITE_DEFAULT_ERROR_CORRECTION: 'L' | 'M' | 'Q' | 'H';
     VITE_ENABLE_LOGO: boolean;
   }
   ```

3. **パフォーマンスモニタリング**
   - Lighthouse スコアの監視
   - Core Web Vitals の最適化
   - エラーログの収集

### 8.7 実装の優先順位とフェーズ分け

#### フェーズ1: 基本機能の実装（1週間）
1. **プロジェクトセットアップ**
   ```bash
   # プロジェクト作成
   npm create vite@latest qr-generator -- --template react-ts
   cd qr-generator
   
   # 依存関係のインストール
   npm install qrcode.react qr-code-styling @shadcn/ui tailwindcss
   npm install -D @types/react @types/node autoprefixer postcss
   ```

2. **基本コンポーネントの実装**
   ```typescript
   // src/components/QRCodeGenerator/index.tsx
   import { QRCodeSVG } from 'qrcode.react';
   import QRCodeStyling from 'qr-code-styling';
   
   export const QRCodeGenerator: React.FC = () => {
     // 基本実装
   };
   ```

#### フェーズ2: デザインとUX改善（1週間）
1. **UIコンポーネントの実装**
   - ShadcnUIを使用したモダンなフォーム
   - インタラクティブなプレビュー
   - レスポンシブデザイン

2. **アニメーションとトランジション**
   ```typescript
   // src/components/PreviewPanel/index.tsx
   import { motion } from 'framer-motion';
   
   export const PreviewPanel: React.FC = () => {
     return (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
       >
         // プレビュー実装
       </motion.div>
     );
   };
   ```

#### フェーズ3: 高度な機能追加（2週間）
1. **テンプレート機能**
   ```typescript
   interface QRTemplate {
     name: string;
     config: QRCodeConfig;
     previewImage: string;
   }
   
   const templates: QRTemplate[] = [
     {
       name: 'ビジネス',
       config: {
         fgColor: '#000000',
         bgColor: '#ffffff',
         // その他の設定
       },
       previewImage: '/templates/business.png'
     },
     // 他のテンプレート
   ];
   ```

2. **エクスポート機能の強化**
   - 複数形式対応（SVG/PNG/PDF）
   - バッチ生成機能
   - クラウド保存連携

#### フェーズ4: 最適化とテスト（1週間）
1. **パフォーマンス最適化**
   ```typescript
   // src/hooks/useQRCodeGeneration.ts
   export const useQRCodeGeneration = () => {
     const worker = useMemo(() => new Worker('/workers/qr-generator.ts'), []);
     
     const generateQRCode = useCallback(async (config: QRCodeConfig) => {
       return new Promise((resolve) => {
         worker.postMessage(config);
         worker.onmessage = (e) => resolve(e.data);
       });
     }, [worker]);
     
     return { generateQRCode };
   };
   ```

2. **テスト実装**
   - ユニットテスト
   - E2Eテスト（Cypress）
   - パフォーマンステスト

### 8.8 デプロイメントフロー
1. **CI/CD設定**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy QR Generator
   on:
     push:
       branches: [main]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Setup Node.js
           uses: actions/setup-node@v2
         - name: Install dependencies
           run: npm ci
         - name: Build
           run: npm run build
         - name: Deploy
           uses: cloudflare/wrangler-action@v3
   ```

2. **モニタリング設定**
   - Sentry for エラー追跡
   - Google Analytics for ユーザー行動分析
   - Lighthouse CI for パフォーマンス監視

### 8.9 今後の拡張計画
1. **機能拡張**
   - AIによるデザイン提案
   - バッチ処理機能
   - API提供

2. **インテグレーション**
   - 各種CMSとの連携
   - ソーシャルメディア共有
   - チーム共有機能

