// app.js
const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const dotenv = require('dotenv')
const passport = require('./config/passport') // Passportの設定を読み込み

// ルートのインポート
const authRoutes = require('./routes/authRoutes')
const alunosRoutes = require('./routes/alunosRoutes');
const turmaRoutes = require('./routes/turmaRoutes');
const aplicarNotasRoutes = require('./routes/aplicarNotasRoutes');
const notasFaltasRoutes = require('./routes/notasFaltasRoutes');
const disciplinasRoutes = require('./routes/disciplinasRoutes');
const userRoutes = require('./routes/userRoutes');
const responsavelAlunoRoutes = require('./routes/responsavelAlunoRoutes');
const responsavelRoutes = require('./routes/responsavelRoutes');
const turmaDisciplinaRoutes = require('./routes/turmaDisciplinaRoutes');
const cadastrarUsuarioRoutes = require('./routes/cadastrarUsuarioRoutes');
const muralRoutes = require('./routes/muralRoutes');

dotenv.config()


// ミドルウェア設定
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // 本番環境ではtrue
      httpOnly: true,
      maxAge: 1000 * 60 * 10 // 1時間
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// スタティックファイルの配信設定
app.use(express.static(path.join(__dirname, 'public')))



app.use(notasFaltasRoutes);
// Cada pagina de funcao    ルート設定
app.use('/', authRoutes);
app.use('/', notasFaltasRoutes); // apriNotasで使用
app.use('/notas_faltasApri', notasFaltasRoutes);
app.use('/disciplinas', disciplinasRoutes);
app.use('/users', userRoutes);
app.use('/notas_faltas', notasFaltasRoutes);
app.use('/alunos', alunosRoutes);
app.use('/turmas', turmaRoutes);
app.use('/aplicarNotas', aplicarNotasRoutes);
app.use('/turma_disciplinas', turmaRoutes);
app.use('/turma_disciplinas2', turmaDisciplinaRoutes); // プレフィックスが一致しているか確認
app.use('/resps_aluno', responsavelAlunoRoutes);
app.use('/responsaveis', responsavelRoutes);
app.use('/usuarios', cadastrarUsuarioRoutes);
app.use('/publicacoes', muralRoutes);


// ダッシュボードルート
const isAuthenticated = require('./middleware/isAuthenticated')

app.post('/login', (req, res) => {
  // 認証処理（例：データベースからユーザーを検索）
  const userData = { 
    id_usuario: user.id_usuario, 
    nome_usuario: user.nome_usuario, 
    cpf_usuario: user.cpf_usuario, 
    endereco_usuario: user.endereco_usuario,
    telefone_usuario: user.telefone_usuario,
    email_usuario: user.email_usuario,
    nascimento_usuario: user.nascimento_usuario,
    id_perfil: user.id_perfil,
    id_aluno: user.id_aluno,
    ra_aluno: user.ra_aluno, // Alunoの情報を追加
    data_matricula: user.data_matricula,
    id_turma: user.id_turma
   }; // 必要な情報を取得
  req.session.user = userData; // ユーザー情報をセッションに保存

  res.redirect('/veriNotas'); // リダイレクト
});

app.get('/calendario', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('calendario', { user: req.session.user }) // ダッシュボードを表示
})

app.get('/home', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('home', { user: req.session.user }) // ダッシュボードを表示
})

app.get('/mural', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('mural', { user: req.session.user }) // ダッシュボードを表示
})

app.get('/dadosCadastrais', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('dadosCadastrais', { user: req.session.user }) // ダッシュボードを表示
})

app.get('/veriNotas', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('veriNotas', { user: req.session.user }) // ダッシュボードを表示
})
app.get('/veriFaltas', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('veriFaltas', { user: req.session.user }) // ダッシュボードを表示
})
app.get('/arpicarNotas', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('arpicarNotas', { user: req.session.user }) // ダッシュボードを表示
})
app.get('/arpicarFaltas', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('arpicarFaltas', { user: req.session.user }) // ダッシュボードを表示
})
app.get('/editarNotas', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('editarNotas', { user: req.session.user }) // ダッシュボードを表示
})

app.get('/turma', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('turma', { user: req.session.user }) // ダッシュボードを表示
})
app.get('/disciplina', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('disciplina', { user: req.session.user }) // ダッシュボードを表示
})
app.get('/aluno', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('aluno', { user: req.session.user }) // ダッシュボードを表示
})
app.get('/responsavel', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('responsavel', { user: req.session.user }) // ダッシュボードを表示
})
app.get('/organizacao', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('organizacao', { user: req.session.user }) // ダッシュボードを表示
})
app.get('/professor', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login') // ユーザーがログインしていない場合
  }
  res.render('professor', { user: req.session.user }) // ダッシュボードを表示
})




app.set('view engine', 'ejs'); // EJSテンプレートエンジンを設定
app.set('views', path.join(__dirname, 'views')); // ビューフォルダを指定


// 404エラーハンドリング
app.use((req, res, next) => {
  res.status(404).render('404', { message: 'Página não encontrada' })
})

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Ocorreu um erro no servidor')
})

// サーバー起動
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}.`)
})
