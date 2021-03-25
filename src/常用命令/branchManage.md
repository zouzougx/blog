### 项目分支管理

主要的长期分支有 3 个:
dev（dev-2.0 和 dev-2.1）
uat(uat2.0 和 uat-2.1)
pre-prod(pre-prod-2.0 和 pre-prod-2.1)

1.  以 dev 为主线每个 sprint 切出新的分支（dev+sprint）
    eg. dev-2.0-2021-4-11 和 dev-2.1-2021-4-11
2.  在新的分支上切出功能分支进行单独开发(feature+jira 号)
3.  dev+sprint 分支开发完成后 依次合并到下游分支(遵循上游合并到下游，不可逆向操作)  
    uat 当天: dev+sprint-->uat  
    预生产当天: dev+sprint-->pre-prod

### dev+sprint 分支开发阶段

1. 在 dev 分支切出 dev+sprint 分支
2. 在 dev 切出功能分支(feature+jira 号) e.g. feature-4216, 功能开发完成自测后， 使用 rebase 操作进行提交合并
3. feature 开发完成后合并到 sprint 对应的 dev 分支
4. 提测后发现 defect, 在 feature 分支修改 然后合到该 sprint 对应的 fev 分支的

### uat

1. dev-sprint 内部测试完成后, 在 uat 当天按照 dev-sprint-->dev-->uat 进行合并
2. 在 uat 分支切出当天 uat 的稳定分支 eg.uat-2021-03-25
3. uat 问题  
   I. 需要 uat 当天紧急修复的 可直接修复在 uat 分支上, 并切出新的分支-b,-c 等,并记得 git cherry pick 到对应 dev-sprint 最好也同步到 dev(也可以等待 dev-sprint-->dev)  
   II. 非当天需要修复的， 修复在 dev-sprint，等到下次 uat 发布重新发版

### pre-prod 阶段

1. uat 稳定后，在预生产发布当天将 dev-sprint 合到 pre-prod
2. 并从 pre-prod 切出当天的 pre-prod 的稳定分支 eg.pre-prod-2021-04-13
3. 预生产问题  
   I. 需要预生产当天紧急修复的 可直接修复在 pre-prod 分支上, 并切出新的分支-b,-c 等,  
   并 gcp 到 dev-sprint 最好也同步到 dev(也可以等待 dev-sprint-->dev)  
   II.非当天需要修复的， 修复在 dev-sprint，等到下次预生产发布重新发版

### prod 阶段

1. 生产的当天在 pre-prod 分支切出当天的 生产分支 prod-2.0-2021-03-25
2. 生产问题  
   I. 需要生产当天紧急修复的 直接在 pre-prod 分支修复，测试通过后, 在切出 prod-2.0-2021-03-25-b  
   并 gcp 到 dev-sprint 最好也同步到 dev(也可以等待 dev-sprint-->dev)  
   II.非当天要修复的, 修复在 dev-sprint，等到下次预生产发布重新发版
