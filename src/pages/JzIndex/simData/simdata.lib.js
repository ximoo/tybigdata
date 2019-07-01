export default function simData(city, type) {
    this.city = city;
    this.type = type;




    
    this.simTruckGps = function (regionName) {
        let count = 0;
        let sb = "";
        // 随机获取后五位随机序号
        while (count < 5) {
            let random = new Random();
            let str2 = b[random.nextInt(26)];
            let num = random.nextInt(10);
            let j = 0;
            // 控制字母和数字的数量
            if (count > 2) {
                for (var i = 0; i < sb.length(); i++) {
                    var c = sb.charAt(i);
                    if ((c >= 'A') && (c <= 'Z')) {
                        j++;
                    }
                }
            }
            if (j < 2) {
                // 字母与数字的概率相同
                if (random.nextBoolean()) {
                    sb += num;
                } else {
                    sb += str2;
                }
                count++;
            } else {
                sb += num;
                count++;
            }
        }
        // 获取发证机关的随机号
        Random random1 = new Random();
        int num1 = random1.nextInt(31);
        String plate = a[num1] + sb;
        return plate.matches("^.*[A-Z]{3}.*$") ? getPalte() : plate; // 判断是否符合车牌规范，如果开头有连续的字母，则重新获取
    }

}

/*车牌号对应的归属地*/
let cardCallerloc = new Map();
// 北京市（京）
cardCallerloc.set("京A", "北京市");
cardCallerloc.set("京A", "北京市");
cardCallerloc.set("京B", "北京市");
cardCallerloc.set("京C", "北京市");
cardCallerloc.set("京D", "北京市");
cardCallerloc.set("京E", "北京市");
cardCallerloc.set("京J", "北京市");
cardCallerloc.set("京K", "北京市");
cardCallerloc.set("京L", "北京市");
cardCallerloc.set("京M", "北京市");
cardCallerloc.set("京Y", "北京市");
// 上海市（沪）
cardCallerloc.set("沪A", "上海市");
cardCallerloc.set("沪B", "上海市");
cardCallerloc.set("沪C", "上海市");
cardCallerloc.set("沪D", "上海市");
cardCallerloc.set("沪R", "崇明区");
// 天津市（津）
cardCallerloc.set("津A", "天津市");
cardCallerloc.set("津B", "天津市");
cardCallerloc.set("津C", "天津市");
cardCallerloc.set("津D", "天津市");
cardCallerloc.set("津E", "天津市");
// 重庆市（渝）
cardCallerloc.set("渝A", "重庆市");
cardCallerloc.set("渝B", "重庆市");
cardCallerloc.set("渝C", "永川区");
cardCallerloc.set("渝F", "万州区");
cardCallerloc.set("渝G", "涪陵区");
cardCallerloc.set("渝H", "黔江区");
// 河北省（冀）
cardCallerloc.set("冀A", "石家庄市");
cardCallerloc.set("冀B", "唐山市");
cardCallerloc.set("冀C", "秦皇岛市");
cardCallerloc.set("冀D", "邯郸市");
cardCallerloc.set("冀E", "邢台市");
cardCallerloc.set("冀F", "保定市");
cardCallerloc.set("冀G", "张家口市");
cardCallerloc.set("冀H", "承德市");
cardCallerloc.set("冀J", "沧州市");
cardCallerloc.set("冀R", "廊坊市");
cardCallerloc.set("冀S", "沧州市");
cardCallerloc.set("冀T", "衡水市");
// 河南省（豫）
cardCallerloc.set("豫A", "郑州市");
cardCallerloc.set("豫B", "开封市");
cardCallerloc.set("豫C", "洛阳市");
cardCallerloc.set("豫D", "平顶山市");
cardCallerloc.set("豫E", "安阳市");
cardCallerloc.set("豫F", "鹤壁市");
cardCallerloc.set("豫G", "新乡市");
cardCallerloc.set("豫H", "焦作市");
cardCallerloc.set("豫J", "濮阳市");
cardCallerloc.set("豫K", "许昌市");
cardCallerloc.set("豫L", "漯河市");
cardCallerloc.set("豫M", "三门峡市");
cardCallerloc.set("豫N", "商丘市");
cardCallerloc.set("豫P", "周口市");
cardCallerloc.set("豫Q", "驻马店市");
cardCallerloc.set("豫R", "南阳市");
cardCallerloc.set("豫S", "信阳市");
cardCallerloc.set("豫U", "济源市");
// 云南省（云）
cardCallerloc.set("云A", "昆明市");
cardCallerloc.set("云A-V ", "东川区");
cardCallerloc.set("云C", "昭通市");
cardCallerloc.set("云D", "曲靖市");
cardCallerloc.set("云E", "楚雄彝族自治州");
cardCallerloc.set("云F", "玉溪市");
cardCallerloc.set("云G", "红河哈尼族彝族自治州");
cardCallerloc.set("云H", "文山壮族苗族自治州");
cardCallerloc.set("云J", "思茅区");
cardCallerloc.set("云K", "西双版纳傣族自治州");
cardCallerloc.set("云L", "大理白族自治州");
cardCallerloc.set("云M", "保山市");
cardCallerloc.set("云N", "德宏傣族景颇族自治州");
cardCallerloc.set("云P", "丽江市");
cardCallerloc.set("云Q", "怒江傈僳族自治州");
cardCallerloc.set("云R", "迪庆藏族自治州");
cardCallerloc.set("云S", "临沧市");
// 辽宁省（辽）
cardCallerloc.set("辽A", "沈阳市");
cardCallerloc.set("辽B", "大连市");
cardCallerloc.set("辽C", "鞍山市");
cardCallerloc.set("辽D", "抚顺市");
cardCallerloc.set("辽E", "本溪市");
cardCallerloc.set("辽F", "丹东市");
cardCallerloc.set("辽G", "锦州市");
cardCallerloc.set("辽H", "营口市");
cardCallerloc.set("辽J", "阜新市");
cardCallerloc.set("辽K", "辽阳市");
cardCallerloc.set("辽L", "盘锦市");
cardCallerloc.set("辽M", "铁岭市");
cardCallerloc.set("辽N", "朝阳市");
cardCallerloc.set("辽P", "葫芦岛市");
// 黑龙江省（黑）
cardCallerloc.set("黑A", "哈尔滨市");
cardCallerloc.set("黑B", "齐齐哈尔市");
cardCallerloc.set("黑C", "牡丹江市");
cardCallerloc.set("黑D", "佳木斯市");
cardCallerloc.set("黑E", "大庆市");
cardCallerloc.set("黑F", "伊春市");
cardCallerloc.set("黑G", "鸡西市");
cardCallerloc.set("黑H", "鹤岗市");
cardCallerloc.set("黑J", "双鸭山市");
cardCallerloc.set("黑K", "七台河市");
cardCallerloc.set("黑L", "松花江");
cardCallerloc.set("黑M", "绥化市");
cardCallerloc.set("黑N", "黑河市");
cardCallerloc.set("黑P", "大兴安岭地区");
cardCallerloc.set("黑R", "农垦系统");
// 湖南省（湘）
cardCallerloc.set("湘A", "长沙市");
cardCallerloc.set("湘B", "株洲市");
cardCallerloc.set("湘C", "湘潭市");
cardCallerloc.set("湘D", "衡阳市");
cardCallerloc.set("湘E", "邵阳市");
cardCallerloc.set("湘F", "岳阳市");
cardCallerloc.set("湘G", "张家界市");
cardCallerloc.set("湘H", "益阳市");
cardCallerloc.set("湘J", "常德市");
cardCallerloc.set("湘K", "娄底市");
cardCallerloc.set("湘L", "郴州市");
cardCallerloc.set("湘M", "永州市");
cardCallerloc.set("湘N", "怀化市");
cardCallerloc.set("湘U", "湘西土家族苗族自治州");
// 安徽省（皖）
cardCallerloc.set("皖A", "合肥市");
cardCallerloc.set("皖B", "芜湖市");
cardCallerloc.set("皖C", "蚌埠市");
cardCallerloc.set("皖D", "淮南市");
cardCallerloc.set("皖E", "马鞍山市");
cardCallerloc.set("皖F", "淮北市");
cardCallerloc.set("皖G", "铜陵市");
cardCallerloc.set("皖H", "安庆市");
cardCallerloc.set("皖J", "黄山市");
cardCallerloc.set("皖K", "阜阳市");
cardCallerloc.set("皖L", "宿州市");
cardCallerloc.set("皖M", "滁州市");
cardCallerloc.set("皖N", "六安市");
cardCallerloc.set("皖P", "宣城市");
cardCallerloc.set("皖R", "池州市");
cardCallerloc.set("皖S", "亳州市");
// 山东省（鲁）
cardCallerloc.set("鲁A", "济南市");
cardCallerloc.set("鲁B", "青岛市");
cardCallerloc.set("鲁C", "淄博市");
cardCallerloc.set("鲁D", "枣庄市");
cardCallerloc.set("鲁E", "东营市");
cardCallerloc.set("鲁F", "烟台市");
cardCallerloc.set("鲁G", "潍坊市");
cardCallerloc.set("鲁H", "济宁市");
cardCallerloc.set("鲁J", "泰安市");
cardCallerloc.set("鲁K", "威海市");
cardCallerloc.set("鲁L", "日照市");
cardCallerloc.set("鲁M", "滨州市");
cardCallerloc.set("鲁N", "德州市");
cardCallerloc.set("鲁P", "聊城市");
cardCallerloc.set("鲁Q", "临沂市");
cardCallerloc.set("鲁R", "菏泽市");
cardCallerloc.set("鲁S", "莱芜市");
cardCallerloc.set("鲁U", "青岛市");
cardCallerloc.set("鲁V", "潍坊市");
cardCallerloc.set("鲁Y", "烟台市");
// 新疆维吾尔自治区（新）
cardCallerloc.set("新A", "乌鲁木齐市");
cardCallerloc.set("新B", "昌吉回族自治州");
cardCallerloc.set("新C", "石河子市");
cardCallerloc.set("新D", "奎屯市");
cardCallerloc.set("新E", "博尔塔拉蒙古自治州");
cardCallerloc.set("新F", "伊犁哈萨克自治州");
cardCallerloc.set("新G", "塔城地区");
cardCallerloc.set("新H", "阿勒泰地区");
cardCallerloc.set("新J", "克拉玛依市");
cardCallerloc.set("新K", "吐鲁番市");
cardCallerloc.set("新L", "哈密市");
cardCallerloc.set("新M", "巴音郭愣蒙古自治州");
cardCallerloc.set("新N", "阿克苏地区");
cardCallerloc.set("新P", "克孜勒苏柯尔克孜自治州");
cardCallerloc.set("新Q", "喀什地区");
cardCallerloc.set("新R", "和田地区");
// 江苏省（苏）
cardCallerloc.set("苏A", "南京市");
cardCallerloc.set("苏B", "无锡市");
cardCallerloc.set("苏C", "徐州市");
cardCallerloc.set("苏D", "常州市");
cardCallerloc.set("苏E", "苏州市");
cardCallerloc.set("苏F", "南通市");
cardCallerloc.set("苏G", "连云港市");
cardCallerloc.set("苏H", "淮安市");
cardCallerloc.set("苏J", "盐城市");
cardCallerloc.set("苏K", "扬州市");
cardCallerloc.set("苏L", "镇江市");
cardCallerloc.set("苏M", "泰州市");
cardCallerloc.set("苏N", "宿迁市");
// 浙江省（浙）
cardCallerloc.set("浙A", "杭州市");
cardCallerloc.set("浙B", "宁波市");
cardCallerloc.set("浙C", "温州市");
cardCallerloc.set("浙D", "绍兴市");
cardCallerloc.set("浙E", "湖州市");
cardCallerloc.set("浙F", "嘉兴市");
cardCallerloc.set("浙G", "金华市");
cardCallerloc.set("浙H", "衢州市");
cardCallerloc.set("浙J", "台州市");
cardCallerloc.set("浙K", "丽水市");
cardCallerloc.set("浙L", "舟山市");
// 江西省（赣）
cardCallerloc.set("赣A", "南昌市");
cardCallerloc.set("赣B", "赣州市");
cardCallerloc.set("赣C", "宜春市");
cardCallerloc.set("赣D", "吉安市");
cardCallerloc.set("赣E", "上饶市");
cardCallerloc.set("赣F", "抚州市");
cardCallerloc.set("赣G", "九江市");
cardCallerloc.set("赣H", "景德镇市");
cardCallerloc.set("赣J", "萍乡市");
cardCallerloc.set("赣K", "新余市");
cardCallerloc.set("赣L", "鹰潭市");
cardCallerloc.set("赣M", "南昌市");
// 湖北省（鄂）
cardCallerloc.set("鄂A", "武汉市");
cardCallerloc.set("鄂B", "黄石市");
cardCallerloc.set("鄂C", "十堰市");
cardCallerloc.set("鄂D", "荆州市");
cardCallerloc.set("鄂E", "宜昌市");
cardCallerloc.set("鄂F", "襄樊市");
cardCallerloc.set("鄂G", "鄂州市");
cardCallerloc.set("鄂H", "荆门市");
cardCallerloc.set("鄂J", "黄冈市");
cardCallerloc.set("鄂K", "孝感市");
cardCallerloc.set("鄂L", "咸宁市");
cardCallerloc.set("鄂M", "仙桃市");
cardCallerloc.set("鄂N", "潜江市");
cardCallerloc.set("鄂P", "神农架林区");
cardCallerloc.set("鄂Q", "恩施土家族苗族自治州");
cardCallerloc.set("鄂R", "天门市");
cardCallerloc.set("鄂S", "随州市");
// 广西壮族自治区（桂）
cardCallerloc.set("桂A", "南宁市");
cardCallerloc.set("桂B", "柳州市");
cardCallerloc.set("桂C", "桂林市");
cardCallerloc.set("桂D", "梧州市");
cardCallerloc.set("桂E", "北海市");
cardCallerloc.set("桂F", "崇左市");
cardCallerloc.set("桂G", "来宾市");
cardCallerloc.set("桂H", "桂林市");
cardCallerloc.set("桂J", "贺州市");
cardCallerloc.set("桂K", "玉林市");
cardCallerloc.set("桂L", "百色市");
cardCallerloc.set("桂M", "河池市");
cardCallerloc.set("桂N", "钦州市");
cardCallerloc.set("桂P", "防城港市");
cardCallerloc.set("桂R", "贵港市");
// 甘肃省（甘）
cardCallerloc.set("甘A", "兰州市");
cardCallerloc.set("甘B", "嘉峪关市");
cardCallerloc.set("甘C", "金昌市");
cardCallerloc.set("甘D", "白银市");
cardCallerloc.set("甘E", "天水市");
cardCallerloc.set("甘F", "酒泉市");
cardCallerloc.set("甘G", "张掖市");
cardCallerloc.set("甘H", "武威市");
cardCallerloc.set("甘J", "定西市");
cardCallerloc.set("甘K", "陇南市");
cardCallerloc.set("甘L", "平凉市");
cardCallerloc.set("甘M", "庆阳市");
cardCallerloc.set("甘N", "临夏回族自治州");
cardCallerloc.set("甘P", "甘南藏族自治州");
// 山西省（晋）
cardCallerloc.set("晋A", "太原市");
cardCallerloc.set("晋B", "大同市");
cardCallerloc.set("晋C", "阳泉市");
cardCallerloc.set("晋D", "长治市");
cardCallerloc.set("晋E", "晋城市");
cardCallerloc.set("晋F", "朔州市");
cardCallerloc.set("晋H", "忻州市");
cardCallerloc.set("晋J", "吕梁市");
cardCallerloc.set("晋K", "晋中市");
cardCallerloc.set("晋L", "临汾市");
cardCallerloc.set("晋M", "运城市");
// 内蒙古自治区（蒙）
cardCallerloc.set("蒙A", "呼和浩特市");
cardCallerloc.set("蒙B", "包头市");
cardCallerloc.set("蒙C", "乌海市");
cardCallerloc.set("蒙D", "赤峰市");
cardCallerloc.set("蒙E", "呼伦贝尔市");
cardCallerloc.set("蒙F", "兴安盟");
cardCallerloc.set("蒙G", "通辽市");
cardCallerloc.set("蒙H", "锡林郭勒盟");
cardCallerloc.set("蒙J", "乌兰察布市");
cardCallerloc.set("蒙K", "鄂尔多斯市");
cardCallerloc.set("蒙L", "巴彦淖尔市");
cardCallerloc.set("蒙M", "阿拉善盟");
// 陕西省（陕）
cardCallerloc.set("陕A", "西安市");
cardCallerloc.set("陕B", "铜川市");
cardCallerloc.set("陕C", "宝鸡市");
cardCallerloc.set("陕D", "咸阳市");
cardCallerloc.set("陕E", "渭南市");
cardCallerloc.set("陕F", "汉中市");
cardCallerloc.set("陕G", "安康市");
cardCallerloc.set("陕H", "商洛市");
cardCallerloc.set("陕J", "延安市");
cardCallerloc.set("陕K", "榆林市");
cardCallerloc.set("陕V", "杨凌区");
// 吉林省（吉）
cardCallerloc.set("吉A", "长春市");
cardCallerloc.set("吉B", "吉林市");
cardCallerloc.set("吉C", "四平市");
cardCallerloc.set("吉D", "辽源市");
cardCallerloc.set("吉E", "通化市");
cardCallerloc.set("吉F", "白山市");
cardCallerloc.set("吉G", "白城市");
cardCallerloc.set("吉H", "延边朝鲜族自治州");
cardCallerloc.set("吉J", "松原市");
cardCallerloc.set("吉K", "长白朝鲜族自治县");
// 福建省（闽）
cardCallerloc.set("闽A", "福州市");
cardCallerloc.set("闽B", "莆田市");
cardCallerloc.set("闽C", "泉州市");
cardCallerloc.set("闽D", "厦门市");
cardCallerloc.set("闽E", "漳州市");
cardCallerloc.set("闽F", "龙岩市");
cardCallerloc.set("闽G", "三明市");
cardCallerloc.set("闽H", "南平市");
cardCallerloc.set("闽J", "宁德市");
cardCallerloc.set("闽K", "省直系统");
// 贵州省（贵）
cardCallerloc.set("贵A", "贵阳市");
cardCallerloc.set("贵B", "六盘水市");
cardCallerloc.set("贵C", "遵义市");
cardCallerloc.set("贵D", "铜仁地区");
cardCallerloc.set("贵E", "黔西南布依族苗族自治州");
cardCallerloc.set("贵F", "毕节地区");
cardCallerloc.set("贵G", "安顺市");
cardCallerloc.set("贵H", "黔东南苗族侗族自治州");
cardCallerloc.set("贵J", "黔南布依族苗族自治州");
// 广东省（粤）
cardCallerloc.set("粤A", "广州市");
cardCallerloc.set("粤B", "深圳市");
cardCallerloc.set("粤C", "珠海市");
cardCallerloc.set("粤D", "汕头市");
cardCallerloc.set("粤E", "佛山市");
cardCallerloc.set("粤F", "韶关市");
cardCallerloc.set("粤G", "湛江市");
cardCallerloc.set("粤H", "肇庆市");
cardCallerloc.set("粤J", "江门市");
cardCallerloc.set("粤K", "茂名市");
cardCallerloc.set("粤L", "惠州市");
cardCallerloc.set("粤M", "梅州市");
cardCallerloc.set("粤N", "汕尾市");
cardCallerloc.set("粤P", "河源市");
cardCallerloc.set("粤Q", "阳江市");
cardCallerloc.set("粤R", "清远市");
cardCallerloc.set("粤S", "东莞市");
cardCallerloc.set("粤T", "中山市");
cardCallerloc.set("粤U", "潮州市");
cardCallerloc.set("粤V", "揭阳市");
cardCallerloc.set("粤W", "云浮市");
cardCallerloc.set("粤X", "顺德区");
cardCallerloc.set("粤Y", "南海区");
cardCallerloc.set("粤Z", "港澳进入内地车辆");
// 四川省（川）
cardCallerloc.set("川A", "成都市");
cardCallerloc.set("川B", "绵阳市");
cardCallerloc.set("川C", "自贡市");
cardCallerloc.set("川D", "攀枝花市");
cardCallerloc.set("川E", "泸州市");
cardCallerloc.set("川F", "德阳市");
cardCallerloc.set("川H", "广元市");
cardCallerloc.set("川J", "遂宁市");
cardCallerloc.set("川K", "内江市");
cardCallerloc.set("川L", "乐山市");
cardCallerloc.set("川M", "资阳市");
cardCallerloc.set("川Q", "宜宾市");
cardCallerloc.set("川R", "南充市");
cardCallerloc.set("川S", "达州市");
cardCallerloc.set("川T", "雅安市");
cardCallerloc.set("川U", "阿坝藏族羌族自治州");
cardCallerloc.set("川V", "甘孜藏族自治州");
cardCallerloc.set("川W", "凉山彝族自治州");
cardCallerloc.set("川X", "广安市");
cardCallerloc.set("川Y", "巴中市");
cardCallerloc.set("川Z", "眉山市");
// 青海省（青）
cardCallerloc.set("青A", "西宁市");
cardCallerloc.set("青B", "海东地区");
cardCallerloc.set("青C", "海北藏族自治州");
cardCallerloc.set("青D", "黄南藏族自治州");
cardCallerloc.set("青E", "海南藏族自治州");
cardCallerloc.set("青F", "果洛藏族自治州");
cardCallerloc.set("青G", "玉树藏族自治州");
cardCallerloc.set("青H", "海西蒙古族藏族自治州");
// 西藏自治区（藏）
cardCallerloc.set("藏A", "拉萨市");
cardCallerloc.set("藏B", "昌都地区");
cardCallerloc.set("藏C", "山南市");
cardCallerloc.set("藏D", "日喀则市");
cardCallerloc.set("藏E", "那曲地区");
cardCallerloc.set("藏F", "阿里地区");
cardCallerloc.set("藏G", "林芝市");
cardCallerloc.set("藏H", "驻四川省天全县车辆管理所");
cardCallerloc.set("藏J", "驻青海省格尔木市车辆管理所");
// 海南省（琼）
cardCallerloc.set("琼A", "海口市");
cardCallerloc.set("琼B", "三亚市");
cardCallerloc.set("琼C", "琼海市");
cardCallerloc.set("琼D", "五指山市");
cardCallerloc.set("琼E", "洋浦开发区");
// 宁夏回族自治区（宁）
cardCallerloc.set("宁A", "银川市");
cardCallerloc.set("宁B", "石嘴山市");
cardCallerloc.set("宁C", "银南市");
cardCallerloc.set("宁D", "固原市");
cardCallerloc.set("宁E", "中卫市");

/*车牌号前缀*/
let cardTitle = new Set(["京", "沪", "津", "渝", "冀", "豫", "云", "辽", "黑", "湘", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘", "晋", "蒙", "陕", "吉", "闽", "贵", "粤", "川", "青", "藏", "琼", "宁"]);














}