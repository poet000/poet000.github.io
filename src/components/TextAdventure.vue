<template>
  <div class="TextAdventure">
    <div class="div_title">
      <div style="position: absolute; right: 0; display: flex; height: 65px; gap: 10px; padding-right: 20px;">
        <div @click="back" class="title_button">返回</div>
        <div @click="dowload" class="title_button">下载</div>
        <div @ycopy="shareText" class="title_button">分享</div>
      </div>
    </div>
    <div class="div_mainlay">
      <div class="views">
        <div class="text-a">
          <div id="title">{{ gameTitle ? gameTitle : '加载中...' }}</div>
        </div>
        <div class="text-b">
          <div id="content" v-html="selectContent?.content"></div>
        </div>
        <div id="linkDiv" class="text-b" v-show="selectContent.link">
            关键词：
            <a id="linkLabel" style="color:#0000ff;cursor:pointer;" target="_blank" v-for="item in selectContent.link" :key="item.str" :href="item.src"> {{ item.str }} </a>
        </div>
        <div>
          <div class="selectButton" v-for="item in selectContent.btnList" :key="item.txt" @click="loadItem(item.lastId)">{{ item.txt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/utils/public.less'
const gndmx = [
  {
    id: 1,
    content: "你是某国男性，简称国男，今年20岁，就读于某高校。今天你没有课，你决定：",
    btnList: [{ txt: '呆在宿舍', lastId: 2 }, { txt: '出去逛逛', lastId: 3 }]
  },
  {
    id: 2,
    content: '你打算在宿舍享受一下颓废的生活，于是点了份外卖开始打游戏。<br><br>几轮厮杀后，刚回宿舍的室友问你为什么在食堂对着女生手冲，你感觉有点莫名其妙。<br><br>直到你打开微信，才发现网上到处都是你公然猥亵女生的消息。可你今天根本没出过宿舍。<br><br>几天后，涉事女生表示此事纯属虚构，而你早已经社会性死亡。',
    link: [
      { str: '深圳大学食堂', src: 'https://weibo.com/6239620007/L6iAi5T2l' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 1 }]
  },
  {
    id: 3,
    content: '出门应该带上哪些东西好呢？你看着手机、平板、kindle、switch... 决定：',
    btnList: [{ txt: '全部都带上', lastId: 4 }, { txt: '只带上必要的', lastId: 5 }]
  },
  {
    id: 4,
    content: '由于你的包太大，不小心碰到了一位学姐的屁股，她在社交网络上称你是色狼，你社会性死亡。',
    link: [
      { str: '清华老师回应学姐错告学弟', src: 'https://weibo.com/2615417307/JuLwat2bs' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 3 }]
  },
  {
    id: 5,
    content: '你带上手机和蓝牙耳机出门，在学校逛了一圈，看了看时间该吃午饭了。等你来到食堂，这里已经人满患，你选了一个看起来不太长的队伍走了过去：',
    btnList: [{ txt: '跟紧前人防止被插队', lastId: 6 }, { txt: '和前一个人保持距离', lastId: 7 }]
  },
  {
    id: 6,
    content: '由于距离前面的女生太近，你被她拍了下来，并在社交网络上造谣你对她图谋不轨。照片迅速传播，你每次出门都被大家指指点点，终于社会性死亡。',
    link: [
      { str: '大连海事大学女硕士食堂污蔑男生', src: 'https://www.baidu.com/s?wd=大连海事大学女硕士食堂污蔑男生' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 5 }]
  },
  {
    id: 7,
    content: '你和前一个人保持着距离，但是队伍移动得很慢，你打算：',
    btnList: [{ txt: '玩手机打发时间', lastId: 8 }, { txt: '静静的听歌就好', lastId: 9 }]
  },
  {
    id: 8,
    content: '你忘了跟上前面的队伍，突然听到一个女生喊"你是不是插我队？！"接着一个玻璃瓶就碎在了你的后脑勺，虽然你最后制服了对方，但你也受伤住院。',
    link: [
      { str: '广东医科大学玻璃瓶', src: 'https://www.baidu.com/s?wd=广东医科大学玻璃瓶' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 7 }]
  },
  {
    id: 9,
    content: '你跟着队伍打到了饭，吃饭时耳机没电了，便把耳机放到一旁，边吃饭边玩起手机。这时，你注意到一个女生在偷你耳机，你准备：',
    btnList: [{ txt: '立即制止她', lastId: 10 }, { txt: '假装没看到', lastId: 11 }]
  },
  {
    id: 10,
    content: '你将小偷捉了现行，对方却表示："抛开事实不谈，你坐了我常坐的位子难道就没错吗"，然后砸了你的耳机扬长而去。',
    link: [
      { str: '华东理工大学耳机', src: 'https://www.baidu.com/s?wd=华东理工大学耳机' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 9 }]
  },
  {
    id: 11,
    content: '吃完了饭，你回到宿舍楼，刚吃饱的你不太想运动，但是电梯里已经站了几个女生，你决定：',
    btnList: [{ txt: '坐电梯', lastId: 12 }, { txt: '走楼梯', lastId: 13 }]
  },
  {
    id: 12,
    content: '电梯是公共资源，大家都能用，你抱着这个想法走进电梯，却被电梯里的女生认为是抢占她们的资源，并对你网暴。事件发酵后，学校禁止了低楼层的男生使用电梯。',
    link: [
      { str: '北京师范大学电梯', src: 'https://www.baidu.com/s?wd=北京师范大学电梯' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 11 }]
  },
  {
    id: 13,
    content: '你爬楼梯回到宿舍，然后无惊无险的毕业。你找到一份996的工作，贷款买了房和车，并通过相亲结婚。<br><br>婚后一年，你有了个儿子，转眼儿子便到了上小学的年纪，你肩上的担子更重了。<br><br>这天你破天荒的准时下班，你看时间还早，决定：',
    btnList: [{ txt: '赚点外快', lastId: 14 }, { txt: '回家休息', lastId: 15 }]
  },
  {
    id: 14,
    content: '你在网约车平台注册了账号，平台推来两份可接订单，你选择：',
    btnList: [{ txt: '第一份', lastId: 16 }, { txt: '第二份', lastId: 17 }]
  },
  {
    id: 16,
    content: '你选了第一份订单，叫车的是一位女性，目的地不算远。<br><br>你朝着记忆中的路线开了过去，没想到在快到目的地时，乘客突然跳车，并不治身亡，你被拘留二百天。',
    link: [
      { str: '货拉拉司机周某春', src: 'https://weibo.com/1806128454/L55Qeu5zh' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 13 }]
  },
  {
    id: 17,
    content: '叫车的是一位肥硕的女性，手一直插在裤兜里。<br><br>目的地有点远，中间要走很长一段高速。<br><br>行驶途中，她突然从兜里掏出凶器，对着你的脖子连捅数刀。',
    link: [
      { str: '2021年女子持刀连捅司机', src: 'https://www.baidu.com/s?wd=女子持刀连捅司机' },
      { str: '2019年女大学生割喉司机1500元', src: 'https://www.baidu.com/s?wd=2019年女大学生割喉司机1500元' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 13 }]
  },
  {
    id: 15,
    content: '工作了一天，你十分疲惫，决定回家休息。结果到了小区你发现停车位被陌生车辆占用，你决定：',
    btnList: [{ txt: '换个车位', lastId: 18 }, { txt: '联系车主', lastId: 19 }]
  },
  {
    id: 18,
    content: '你找了个没人用的车位，就直接回家，却意外地发现门口放着一双陌生的男鞋。<br><br>怀着好奇与不安的心情，你走进了客厅，眼前的景象让你瞬间崩溃——你的妻子竟然和一个陌生男人在热烈地为彼此的爱意鼓掌庆祝。',
    btnList: [{ txt: '如果能重来...', lastId: 15 }]
  },
  {
    id: 19,
    content: '你拨打122联系车主挪车，对方接到通知后立刻下楼，开车离开了。回到家，<br><br>你发现老婆正在洗澡，于是疲惫的你就躺在沙发上小憩。<br><br>在你即将进入梦乡时，老婆的声音从浴室传来，她让你去接儿子回家。你：',
    btnList: [{ txt: '去接', lastId: 20 }, { txt: '不去', lastId: 21 }]
  },
  {
    id: 20,
    content: '你把儿子接回了家。又和老婆响应国家号召生了二胎，并开始准备三胎。<br><br>可是随着两个儿子长大，他们和你的容貌差异越来越大，你看在眼里，决定：',
    btnList: [{ txt: '装作不知道', lastId: 22 }, { txt: '做亲子鉴定', lastId: 23 }]
  },
  {
    id: 22,
    content: '你对两个儿子的容貌差异视若无睹，视如己出。<br><br>老婆对你很满意，不久，你们又生了第三胎，依然不像你。<br><br>为了供养孩子，你努力工作，奋斗到58岁还没退休，最终在工位上脑溢血猝死，至此断子绝孙。',
    btnList: [{ txt: '如果能重来...', lastId: 20 }]
  },
  {
    id: 23,
    content: '你悄悄带孩子做了亲子鉴定，发现两个儿子都和你没有血缘关系。<br><br>你找妻子理论，她却把你骂得狗血淋头，还说自己出轨都是因为你没用，于是你决定离婚。<br><br>你不再上交工资，并搬出去和父母一起住。这天岳父敲门，要为他女儿的事来赔礼，你决定：',
    btnList: [{ txt: '见面聊聊', lastId: 24 }, { txt: '闭门不见', lastId: 25 }]
  },
  {
    id: 24,
    content: '你打开门，没想到岳父带着刀，他趁你不防砍倒了你，又砍倒了你的父母，然后报警自首。<br><br>最后你老婆出具谅解书，减轻了岳父的刑责，并带着你的家产改嫁了。',
    link: [
      { str: '岳父灭女婿满门女儿出谅解书', src: 'https://www.baidu.com/s?wd=岳父灭女婿满门' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 23 }]
  },
  {
    id: 25,
    content: '你表示此事绝无回旋余地，对岳父闭门不见。<br><br>他离开时，你从窗户意外地看到他手持凶器，顿时后怕不已，不禁为刚才的决定感到庆幸。<br><br>你当机立断，迅速和父母一起搬了出去，并卖掉房子远走他乡。自此，你重获新生。。',
    btnList: [{ txt: '恭喜通关', btnClass: 'successButton', lastId: 1 }]
  },
  {
    id: 21,
    content: '你难得有时间休息，迷迷糊糊地拒绝了。<br><br>平时儿子不用接就能回来，但今天却迟迟未归。<br><br>你找了一整晚，最终得知儿子被陌生女子骗到楼顶推下来摔死了。',
    link: [
      { str: '男童被陌生女子扔下楼', src: 'https://www.baidu.com/s?wd=男童被陌生女子扔下楼' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 19 }]
  }
]
const hldmx = [
  {
    id: 1,
    content: "你是某国男性，简称国男，和女友相恋已久，就要谈婚论嫁了，你决定：",
    btnList: [{ txt: '结婚', lastId: 2 }, { txt: '分手', lastId: 3 }]
  },
  {
    id: 2,
    content: '你和父母去女友家商谈婚事，她家连茶都没给泡，开口就要38.8万彩礼。<br><br>听到这个数字你吓了一跳，不禁抬头望向女友，她却面无表情，一言不发。<br><br>你家表示这个数额实在太高，想再少一些，却被果断拒绝，无奈之下只能回家和亲戚商量。<br><br>回家后你联系了女友，询问是否还有商谈的余地，叛逆了一辈子的她却表示这次要听妈妈的话。<br><br>此时你的家人们正在客厅争得面红耳赤，谁都拿不定主意，作为当事人的你一拍大腿咬牙决定：',
    btnList: [{ txt: '给彩礼', lastId: 4 }, { txt: '不给彩礼', lastId: 5 }, { txt: '给彩礼并房产证加名', lastId:6 }]
  },
  {
    id: 4,
    content: '你借遍了亲戚，终于凑够彩礼。但这钱毕竟是笔大数额，需要慎重一些。<br><br>你开始纠结彩礼到底是直接给，还是领证后再给呢？经过一番思想斗争，你决定：',
    btnList: [{ txt: '先给彩礼', lastId: 7 }, { txt: '领证再给', lastId: 8 }]
  },
  {
    id: 7,
    content: '女友拿到钱就拉黑了你全部联系方式，既不结婚也不退钱。你老婆没娶到，还欠了一屁股债...',
    link: [{ str: '女方悔婚拒退彩礼男子挂横幅寻人', src: 'https://www.baidu.com/s?wd=女方悔婚拒退彩礼男子挂横幅寻人' }],
    btnList: [{ txt: '如果能重来...', lastId: 2 }]
  },
  {
    id: 8,
    content: '领完证不到半年，你老婆无理由要求离婚，还不给退彩礼。你没了老婆还欠一屁股债...',
    link: [
      { str: '婚后闪离男方要求归还35万彩礼', src: 'https://www.baidu.com/s?wd=婚后闪离男方要求归还35万彩礼' },
      { str: '男子离婚因收入低想要回18万彩礼', src: 'https://www.baidu.com/s?wd=男子离婚因收入低想要回18万彩礼' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 2 }]
  },
  {
    id: 5,
    content: '由于你拒绝给彩礼，女友当天就把你甩了。你恢复单身，不久又找了新女朋友。<br><br>相处一段时间后，新女友突然查出身患白血病，可你们身上都没什么钱。你决定：',
    btnList: [{ txt: '卖房治病', lastId: 9 }, { txt: '直接跑路', lastId: 10 }]
  },
  {
    id: 9,
    content: '你砸锅卖铁凑够40万给女友治病，在你悉心的照料下，她不久就痊愈了。<br><br>可一年后，女友却突然弃你而去嫁给别人。你接受不了打击从此一病不起，开始失眠、头昏、腹泻。<br><br>你到处求医，病情却不见好转。你身无分文，向前女友借钱却被拒。走投无路的你最终只能靠拾荒度日。',
    link: [{ str: '李哨兵40万救治女友后被甩', src: 'https://www.baidu.com/s?wd=李哨兵' }],
    btnList: [{ txt: '如果能重来...', lastId: 2 }]
  },
  {
    id: 10,
    content: '你抛弃重病女友，被街坊邻居唾弃，还因此臭名远扬，再也找不到对象，最终社会性死亡。',
    btnList: [{ txt: '如果能重来...', lastId: 2 }]
  },
  {
    id:6,
    content: '你力排众议，不仅决定给彩礼，还要在婚房的房产证加上女友的名字。<br><br>但房子毕竟价值数百万，家人要你慎重对待。你开始纠结到底是直接加名，还是领证后再加呢？<br><br>经过一番思想斗争，你决定：',
    btnList: [{ txt: '直接加名', lastId: 11 }, { txt: '领证再加', lastId: 12 }]
  },
  {
    id: 11,
    content: '房子刚加完名，女友就把你甩了，还分走了半套房。你钱房两失，欠一屁股债。',
    link: [
      { str: '婚房一半产权赠女友分手索回被驳', src: 'https://www.baidu.com/s?wd=婚房一半产权赠女友分手索回被驳' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 2 }]
  },
  {
    id: 12,
    content: '你顺利结了婚，开始考虑要孩子的事了，你决定',
    btnList: [{ txt: '生孩子', lastId: 13 }, { txt: '不生孩子', lastId: 14 }]
  },
  {
    id: 13,
    content: '你想要孩子，妻子却不想生，直接把孩子给堕了。你起诉离婚，法院却判不准离。<br><br>理由是丈夫不能强迫妻子生育，因为男性没有生育权。你郁郁半生，最终断子绝孙。',
    link: [
      { str: '妻子擅自终止妊娠不侵犯丈夫生育权', src: 'https://www.baidu.com/s?wd=妻子擅自终止妊娠是否侵犯丈夫生育权' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 12 }]
  },
  {
    id: 14,
    content: '你不想要孩子，妻子却想生，于是妻子起诉离婚，法院直接判离。理由是丈夫不得干预妻子生育权。<br><br>你不仅丢了老婆，还钱房两失，成了穷光蛋。但经过几年玩命的工作，你又攒够钱娶了媳妇。<br><br>这次你学聪明了，同意要孩子。为了赚钱养家你更加玩命的工作。几年后，孩子长大了，可长得并不像你。你决定：',
    link: [
      { str: '丈夫不愿生娃妻子起诉离婚', src: 'https://www.baidu.com/s?wd=丈夫不愿生娃妻子起诉离婚' },
    ],
    btnList: [{ txt: '相信妻子', lastId: 15 }, { txt: '偷偷调查', lastId: 16 }, { txt: '先出轨为强', lastId: 17 }]
  },
  {
    id: 15,
    content: '虽然你选择相信妻子，但不久你们还是因为感情破裂离婚了。<br><br>你婚前全款买的三套房，妻子直接分走两套。但为了孩子，你忍了。<br><br>某晚，你回到曾经的小区想看看孩子，却意外听到传言，开始怀疑孩子不是亲生的。你决定：',
    link: [
      { str: '男子婚前全款买三套房离婚妻子要分六成', src: 'https://www.baidu.com/s?wd=男子婚前全款买三套房离婚妻子要分六成' },
    ],
    btnList: [{ txt: '认栽继续付抚养费', lastId: 18 }, { txt: '起诉要求亲子鉴定', lastId: 19 }]
  },
  {
    id: 18,
    content: '你回想前半生，感到委屈又气愤，突发高血压把自己气死了。',
    btnList: [{ txt: '如果能重来...', lastId: 14 }]
  },
  {
    id: 19,
    content: '你想拿回自己的财产，于是起诉要求亲子鉴定，可前妻拒不配合。法院驳回了你的诉讼请求，你还是不服，决定：',
    link: [
      { str: '父亲怀疑非亲生起诉10岁儿子', src: 'https://www.baidu.com/s?wd=父亲怀疑非亲生起诉10岁儿子' },
    ],
    btnList: [{ txt: '深入调查', lastId: 20 }, { txt: '认栽付抚养费', lastId: 18 }]
  },
  {
    id: 20,
    content: '你通过其他途径证明了孩子确实不是你的，法院却判出轨的妻子仅需返还抚养费。你决定：',
    link: [
      { str: '结婚两年才知儿子不是亲生', src: 'https://www.baidu.com/s?wd=结婚两年才知儿子不是亲生' },
      { str: '男子养娃7月意外发现非亲生', src: 'https://www.baidu.com/s?wd=男子养娃7月意外发现非亲生' },
      { str: '男子给女儿上户口发现非亲生', src: 'https://www.baidu.com/s?wd=男子给女儿上户口发现非亲生' },
      { str: '男子发现孩子非亲生获赔1万2', src: 'https://www.baidu.com/s?wd=男子发现孩子非亲生获赔1万2' },
      { str: '男子发现2岁双胞胎女儿非亲生', src: 'https://www.baidu.com/s?wd=男子发现2岁双胞胎女儿非亲生' },
      { str: '男子离婚一年多发现6岁女儿非亲生', src: 'https://www.baidu.com/s?wd=男子离婚一年多发现6岁女儿非亲生' },
      { str: '离婚后发现小女儿非亲生男子起诉前妻获赔', src: 'https://www.baidu.com/s?wd=离婚后发现小女儿非亲生男子起诉前妻获赔' },
    ],
    btnList: [{ txt: '放弃维权', lastId: 21 }, { txt: '抢夺抚养权', lastId: 22 }]
  },
  {
    id: 21,
    content: '虽然房子被分走两套，钱也没要回多少，但至少你不用再为这些破事心烦了。你最终还是想开了，增寿三年。',
    btnList: [{ txt: '恭喜通关', btnClass: 'successButton', lastId: 1 }]
  },
  {
    id: 22,
    content: '带了这么久，你对孩子也有感情了，仍然愿意抚养。但法院判你没资格抚养，最终孩子被生母抢走。',
    link: [
      { str: '男子带娃多年被诉非亲生夺走抚养权', src: 'https://www.baidu.com/s?wd=男子带娃多年被诉非亲生夺走抚养权' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 19 }]
  },
  {
    id: 16,
    content: '经过调查，你掌握了妻子出轨的证据。你决定：',
    btnList: [{ txt: '起诉离婚', lastId: 23 }, { txt: '索赔精神损失费', lastId: 24 }]
  },
  {
    id: 23,
    content: '你起诉离婚，但被法院驳回，突发脑溢血气死，至此断子绝孙。',
    link: [
      { str: '六旬老人发现儿子非亲生起诉离婚被驳', src: 'https://www.baidu.com/s?wd=六旬老人发现儿子非亲生起诉离婚被驳' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 14 }]
  },
  {
    id: 24,
    content: '由于妻子和第三者在外长期同居，法院判她赔偿你1.7万抚养费，还不够调查费的五分之一，你当庭气死。',
    link: [
      { str: '丈夫起诉第三者索赔精神损失费被驳回', src: 'https://www.baidu.com/s?wd=丈夫起诉第三者索赔精神损失费被驳回' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 14 }]
  },
  {
    id: 17,
    content: '你出轨被妻子发现，妻子大闹了一场，而你却无法证明妻子也出轨了。于是你：',
    btnList: [{ txt: '果断离婚', lastId: 25 }, { txt: '道歉 但还出轨', lastId: 26 }]
  },
  {
    id: 25,
    content: '由于你和情人在外面搞出个私生子，法院判你有错在先，需赔偿妻子18万。',
    link: [
      { str: '男子出轨生娃起诉离婚被判支付18万', src: 'https://www.baidu.com/s?wd=男子出轨生娃起诉离婚被判支付18万' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 14 }]
  },
  {
    id: 26,
    content: '你出轨又被发现，妻子起诉离婚，法院判离，除去抚养费，你还要净身出户、赔妻子精神损失费。',
    link: [
      { str: '丈夫出轨妻子获精神损害赔偿12万', src: 'https://www.baidu.com/s?wd=丈夫出轨妻子获精神损害赔偿12万' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 14 }]
  },
  {
    id: 3,
    content: '女友平时就情绪无常，一想到要和她过一辈子你就眼前一黑，慎重考虑后还是决定提出分手。<br><br>但毕竟相处这么久，彼此还是很舍不得，分别前你们紧紧相拥，谁知这时女友突然脱掉衣服吻了上来，你决定：',
    btnList: [{ txt: '接受', lastId: 27 }, { txt: '拒绝', lastId: 28 }]
  },
  {
    id: 27,
    content: '前女友偷偷怀孕生了孩子，孩子长大后突然来找你要抚养费。你经济困难无法支付，被告上了法庭.<br><br>法院判你支付前11年的抚养费，考虑到你的特殊情况，于是允许分期付款。理由是非婚生子女也要履行抚养义务。',
    link: [
      { str: '独自养儿11年后患病索要抚养费获支持', src: 'https://www.baidu.com/s?wd=独自养儿11年后患病索要抚养费获支持' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 1 }]
  },
  {
    id: 28,
    content: '前女友写小作文诬告你强奸，你社会性死亡。',
    link: [
      { str: '罗冠军被诬告性侵案', src: 'https://www.baidu.com/s?wd=罗冠军被诬告性侵案' },
    ],
    btnList: [{ txt: '如果能重来...', lastId: 1 }]
  }
]
export default {
  name: 'TextAdventure',
  components: {},
  data () {
    return {
      gameTitle: null,
      allJson: [],
      selectContent: {},
      shareText: '恐怖游戏官网：poet000.github.io \n\n请复制链接到浏览器打开，无法访问可尝试切换网络，或发送暗号【恐怖游戏】给#公众号:嘲讽，获取本地版游戏。\n\n关键词：https://bing.com/search?q=%E5%98%B2%E8%AE%BD%E6%81%90%E6%80%96%E6%B8%B8%E6%88%8F%E5%90%8D%E5%BD%95'
    }
  },
  methods: {
    dowload () {
      window.open('https://lanzouq.com/b01hriq0f')
    },
    back () {
      this.$router.push({ path: '/' })
    },
    getItem (id, json) {
      var tmp = null;
      for (var i = 0; i < json.length; i++) {
        if (json[i].id == id) {
          tmp = json[i];
          break;
        }
      }
      return tmp;
    },
    loadItem (id) {
      const f = this.$route.path.split('/TextAdventure/')[1]
      this.allJson = f === 'gndmx' ? gndmx : hldmx
      this.gameTitle = f === 'gndmx' ? '国男大冒险' : '婚恋大冒险'
      const info = this.getItem(id, this.allJson)
      this.selectContent = info
    }
  },
  mounted () {
    this.loadItem(1)
  }
}
</script>
<style lang="less" scoped>
.div_title {
  width: 100vw;
  height: 10vh;
  position: fixed;
  top: 0;
  background: transparent;
  pointer-events: none;
  z-index: 1000;
}

.div_title > div {
  pointer-events: auto;  /* 恢复按钮的点击事件 */
}

.div_mainlay {
  flex: 1;
  position: relative;
  overflow: auto;
  display: flex;           /* 添加flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}

.text-a {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 18px;
  margin-bottom: 19px;
  text-align: center;
}

.text-b {
  font-size: 1.1rem;
  font-weight: 360;
  margin-bottom: 19px;
  text-align: left;
}

.views {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px;
  max-height: 90vh;        /* 防止内容过长 */
  overflow-y: auto;        /* 内容过长时可滚动 */
}

.selectButton {
  color: rgb(255, 255, 255);
  background: rgb(15, 136, 235);
  border-radius: 999999px;
  font-size: 18px;
  font-weight: 700;
  width: 240px;
  height: 42px;
  border: none;
  cursor: pointer;
  margin-left: -120px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  z-index: 1;
  margin: 10px 0;
}

.successButton {
  color: rgb(255, 255, 255);
  background: rgb(197, 169, 110);
  border-radius: 999999px;
  font-size: 18px;
  font-weight: 700;
  width: 240px;
  height: 42px;
  border: none;
  cursor: pointer;
  margin-left: -120px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  z-index: 1;
  margin: 10px 0;
}
</style>