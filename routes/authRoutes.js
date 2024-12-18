// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated, authorizeRoles } = require('../middleware/authorize');

// 認証関連のルート
router.get('/login', (req, res) => res.render('login', { message: req.flash('error') }));
/* router.get('/register', (req, res) => res.render('register', { message: req.flash('error') })); */
router.post('/login', authController.login);

router.post('/register', authController.register);
router.get('/logout', authController.logout);


// **ユーザー登録ルートを秘書と管理者に限定**
router.get('/register',  (req, res) => res.render('register', { message: req.flash('error') }));
router.post('/register',  authController.register);

// paginas
router.get('/calendario', (req, res) => {
    res.render('calendario', { user: req.session.user }) // views/apricarFaltas.ejs
});
router.get('/apricarFaltas', ensureAuthenticated, authorizeRoles(2), (req, res) => {
    res.render('apricarFaltas', { user: req.session.user }) // views/apricarFaltas.ejs
})
router.get('/apricarNotas', ensureAuthenticated, authorizeRoles(2), (req, res) => {
    res.render('apricarNotas', { user: req.session.user }) // views/apricarNotas.ejs
})
router.get('/editarNotas', ensureAuthenticated, authorizeRoles(2), (req, res) => {
    res.render('editarNotas', { user: req.session.user }); // views/editarNotas.ejsをレンダリング
});

router.get('/cadastrarUsuario', ensureAuthenticated, authorizeRoles(1, 5), (req, res) => {
  res.render('cadastrarUsuario', { user: req.session.user }); // views/editarNotas.ejsをレンダリング
});



router.get('/variFaltas', ensureAuthenticated, authorizeRoles(3), (req, res) => {
  res.render('variFaltas', { user: req.session.user }) // views/variFaltas.ejs
})
router.get('/variNotas', ensureAuthenticated, authorizeRoles(3), (req, res) => {
  res.render('variNotas', { user: req.session.user }) // views/variNotas.ejs
})



router.get('/connectTurmaDisci', ensureAuthenticated, authorizeRoles(5, 1),  (req, res) => {
  res.render('connectTurmaDisci', { user: req.session.user });
});

router.get('/orgDisciTurma', ensureAuthenticated, authorizeRoles(5, 1),  (req, res) => {
  res.render('orgDisciTurma', { user: req.session.user });
});

router.get('/aluno_resp', ensureAuthenticated, authorizeRoles(5, 1),  (req, res) => {
  res.render('aluno_resp', { user: req.session.user });
});

router.get('/turma', ensureAuthenticated, authorizeRoles(5, 1), (req, res) => {
  res.render('turma', { user: req.session.user }) // views/turma.ejs
})
router.get('/disciplina', ensureAuthenticated, authorizeRoles(5, 1), (req, res) => {
  res.render('disciplina', { user: req.session.user }) // views/disciplina.ejs
})
router.get('/aluno', ensureAuthenticated, authorizeRoles(5, 1), (req, res) => {
  res.render('aluno', { user: req.session.user }) // views/aluno.ejs
})
router.get('/responsavel', ensureAuthenticated, authorizeRoles(5, 1), (req, res) => {
  res.render('responsavel', { user: req.session.user }) // views/responsavel.ejs
})
router.get('/organizacao', ensureAuthenticated, authorizeRoles(5, 1), (req, res) => {
  res.render('organizacao', { user: req.session.user }) // views/organizacao.ejs
})
router.get('/professor', ensureAuthenticated, authorizeRoles(5, 1), (req, res) => {
  res.render('professor', { user: req.session.user }) // views/professor.ejs
})


router.get('/template', (req, res) => {
  res.render('template') // views/professor.ejs
})

router.get('/mural', ensureAuthenticated, (req, res) => {
  res.render('mural', { user: req.session.user }) // views/mural.ejs
})

// パスワードリセット関連のルート
router.get('/forgot-password', authController.getForgotPassword);
router.post('/forgot-password', authController.postForgotPassword);
router.get('/reset-password/:token', authController.getResetPassword);
router.post('/reset-password/:token', authController.postResetPassword);

module.exports = router;
