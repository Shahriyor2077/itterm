const dictRouter = require("../routes/dict.routes");
const authorRouter = require("../routes/author.routes");
const categoryRouter = require("../routes/category.routes");
const descRouter = require("../routes/description.routes");
const synonimRouter = require("../routes/synonim.routes");
const socialRouter = require("../routes/social.routes");
const descTopicRouter = require("../routes/descTopic.routes");
const topicRouter = require("../routes/topic.routes");
const tagRouter = require("../routes/tag.routes");
const adminRouter = require("../routes/admin.routes");
const userRouter = require("../routes/user.routes");
const descQaRouter=require("../routes/descQa.routes");
const guestRouter=require("../routes/guest.routes");
const questionAnswerRouter=require("../routes/questionAnswer.routes")
const authorSocialRouter=require("../routes/authorSocial.routes")


const router = require("express").Router();

router.use("/dict", dictRouter);
router.use("/author", authorRouter);
router.use("/category", categoryRouter);
router.use("/description", descRouter);
router.use("/synonim", synonimRouter);
router.use("/social", socialRouter);
router.use("/desctopic", descTopicRouter);
router.use("/topic", topicRouter);
router.use("/tag", tagRouter);
router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/descqa", descQaRouter);
router.use("/guest", guestRouter);
router.use("QA", questionAnswerRouter);
router.use("authorSocial", authorRouter)

module.exports = router;
