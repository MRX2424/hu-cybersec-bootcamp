import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, FolderTree, Lock, Search, Network, FileText, Copy, Check, ChevronDown, ChevronUp, ChevronRight, Award, Zap, BookOpen, Moon, Sun, Filter } from 'lucide-react';

const LinuxFundamentals = () => {
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [completedCommands, setCompletedCommands] = useState(() => {
    const saved = localStorage.getItem('linuxProgress');
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    navigation: true,
    files: true,
    viewing: false,
    permissions: false,
    search: false,
    network: false,
    system: false
  });

  useEffect(() => {
    localStorage.setItem('linuxProgress', JSON.stringify(completedCommands));
  }, [completedCommands]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const markCommandComplete = (commandId) => {
    if (!completedCommands.includes(commandId)) {
      setCompletedCommands([...completedCommands, commandId]);
    }
  };

  const totalCommands = 25; // عدد الأوامر الإجمالي
  const progress = (completedCommands.length / totalCommands) * 100;

  const CommandBlock = ({ command, description, example, id, securityTip, category }) => {
    const isCompleted = completedCommands.includes(id);
    
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-5 mb-4 border-2 ${
        isCompleted ? 'border-green-500' : 'border-transparent'
      } transition-all hover:shadow-lg`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <code className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {command}
              </code>
              {isCompleted && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  مكتمل
                </span>
              )}
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                copyToClipboard(example.split('\n')[0].replace('$ ', ''), id);
                markCommandComplete(id);
              }}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors`}
            >
              {copiedCommand === id ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              )}
            </button>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-black' : 'bg-gray-900'} rounded-lg p-4 mb-3`}>
          <pre className={`text-sm overflow-x-auto ${darkMode ? 'text-green-300' : 'text-green-400'}`}>
            {example}
          </pre>
        </div>

        {securityTip && (
          <div className={`flex items-start gap-2 p-3 rounded-lg ${
            darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'
          }`}>
            <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className={`font-bold text-sm mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                للأمن السيبراني
              </div>
              <div className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                {securityTip}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Section = ({ id, title, icon: Icon, children, commandCount }) => {
    const isExpanded = expandedSections[id];
    const sectionCommands = React.Children.toArray(children).filter(
      child => child.type === CommandBlock
    );
    const completedInSection = sectionCommands.filter(
      child => completedCommands.includes(child.props.id)
    ).length;
    
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden mb-6 border ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <button
          onClick={() => toggleSection(id)}
          className={`w-full p-6 flex items-center justify-between ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
          } transition-colors`}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {title}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {commandCount} أمر
                </span>
                <span className="text-sm text-green-600 font-semibold">
                  {completedInSection}/{sectionCommands.length} مكتمل
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16">
              <svg className="transform -rotate-90 w-16 h-16">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke={darkMode ? '#374151' : '#E5E7EB'}
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#10B981"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(completedInSection / sectionCommands.length) * 176} 176`}
                  className="transition-all duration-500"
                />
              </svg>
            </div>
            {isExpanded ? (
              <ChevronUp className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            ) : (
              <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            )}
          </div>
        </button>
        
        {isExpanded && (
          <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            {children}
          </div>
        )}
      </div>
    );
  };

  const categories = [
    { id: 'all', name: 'الكل', icon: BookOpen },
    { id: 'navigation', name: 'التنقل', icon: Terminal },
    { id: 'files', name: 'الملفات', icon: FileText },
    { id: 'security', name: 'الأمان', icon: Lock },
    { id: 'network', name: 'الشبكات', icon: Network }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-green-600 to-emerald-700'} text-white py-12 shadow-xl`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ChevronRight className="w-8 h-8 rotate-180" />
              </Link>
              <Terminal className="w-12 h-12" />
              <div>
                <h1 className="text-4xl font-bold">Linux للأمن السيبراني</h1>
                <p className="text-green-100 text-sm mt-1">Master Linux Commands for Ethical Hacking</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 hover:bg-white/10 rounded-lg transition-colors"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold flex items-center gap-2">
                <Award className="w-5 h-5" />
                تقدمك
              </span>
              <span className="text-xl font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm mt-2 text-green-100">
              {completedCommands.length} من {totalCommands} أمر مكتمل
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="ابحث عن أمر..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pr-12 pl-4 py-4 rounded-xl border-2 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-green-500 text-white shadow-lg scale-105'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Intro Card */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} text-white rounded-2xl p-8 mb-8 shadow-2xl`}>
          <h2 className="text-3xl font-bold mb-4">لماذا Linux مهم في الأمن السيبراني؟</h2>
          <p className="text-lg mb-6 opacity-90">
            Linux هو النظام المفضل للهاكرز الأخلاقيين ومحترفي الأمن السيبراني. إتقان أوامره يفتح لك أبواب عالم الاختراق الأخلاقي.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`${darkMode ? 'bg-white/10' : 'bg-white/20'} backdrop-blur rounded-xl p-4`}>
              <Zap className="w-8 h-8 mb-2" />
              <div className="font-bold mb-1">قوة وسرعة</div>
              <div className="text-sm opacity-80">تحكم كامل بالنظام</div>
            </div>
            <div className={`${darkMode ? 'bg-white/10' : 'bg-white/20'} backdrop-blur rounded-xl p-4`}>
              <Lock className="w-8 h-8 mb-2" />
              <div className="font-bold mb-1">أدوات أمنية</div>
              <div className="text-sm opacity-80">Kali Linux & Parrot</div>
            </div>
            <div className={`${darkMode ? 'bg-white/10' : 'bg-white/20'} backdrop-blur rounded-xl p-4`}>
              <Terminal className="w-8 h-8 mb-2" />
              <div className="font-bold mb-1">تعلم عملي</div>
              <div className="text-sm opacity-80">طبق مباشرة</div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <Section id="navigation" title="التنقل والاستكشاف" icon={Terminal} commandCount={3}>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            الأوامر الأساسية للتنقل في نظام الملفات - أول ما يجب أن تتقنه
          </p>

          <CommandBlock
            id="pwd"
            command="pwd"
            category="navigation"
            description="Print Working Directory - اعرف موقعك الحالي في النظام"
            example={`$ pwd
/home/hacker`}
            securityTip="استخدمه دائماً قبل تنفيذ أوامر حساسة لتتأكد من مكانك"
          />

          <CommandBlock
            id="ls"
            command="ls -la"
            category="navigation"
            description="عرض جميع الملفات بما فيها المخفية مع التفاصيل الكاملة"
            example={`$ ls -la
total 48
drwxr-xr-x 8 user user 4096 Jan 15 10:30 .
drwxr-xr-x 3 root root 4096 Jan 10 09:00 ..
-rw------- 1 user user  220 Jan 10 09:00 .bash_history
drwx------ 2 user user 4096 Jan 15 10:30 .ssh`}
            securityTip="الملفات المخفية (تبدأ بنقطة) غالباً تحتوي على إعدادات حساسة مثل .ssh و .bash_history"
          />

          <CommandBlock
            id="cd"
            command="cd"
            category="navigation"
            description="التنقل بين المجلدات بسرعة"
            example={`$ cd /etc              # للمجلدات المهمة
$ cd ~                  # للبيت
$ cd -                  # للمجلد السابق
$ cd ../..              # صعود مستويين`}
            securityTip="مجلد /etc يحتوي على ملفات إعدادات النظام - مكان مهم للاختبارات الأمنية"
          />
        </Section>

        <Section id="files" title="إدارة الملفات والمجلدات" icon={FileText} commandCount={5}>
          <CommandBlock
            id="touch"
            command="touch"
            category="files"
            description="إنشاء ملف أو تحديث وقت التعديل"
            example={`$ touch payload.sh
$ touch -t 202301011200 old_file.txt  # تزوير وقت التعديل`}
            securityTip="يمكن استخدامه لتزوير timestamps الملفات - مفيد في الاختبارات"
          />

          <CommandBlock
            id="mkdir"
            command="mkdir -p"
            category="files"
            description="إنشاء مجلدات متداخلة مرة واحدة"
            example={`$ mkdir -p tools/exploits/web
$ mkdir -m 700 secrets  # مجلد بصلاحيات محددة`}
            securityTip="استخدم -m 700 لإنشاء مجلدات خاصة بك فقط"
          />

          <CommandBlock
            id="cp"
            command="cp -r"
            category="files"
            description="نسخ ملفات ومجلدات كاملة"
            example={`$ cp -r /etc/shadow shadow_backup
$ cp -p important.txt backup.txt  # مع الحفاظ على الصلاحيات`}
            securityTip="احرص على نسخ ملفات النظام الحساسة قبل تعديلها"
          />

          <CommandBlock
            id="mv"
            command="mv"
            category="files"
            description="نقل أو إعادة تسمية - لا يترك نسخة"
            example={`$ mv exploit.py /tmp/
$ mv suspicious_file.txt normal_doc.pdf  # تمويه`}
            securityTip="يمكن استخدامه لإخفاء ملفات مشبوهة بأسماء عادية"
          />

          <CommandBlock
            id="rm"
            command="rm -rf"
            category="files"
            description="حذف نهائي بدون سؤال - خطير جداً!"
            example={`$ rm file.txt
$ rm -rf folder/
$ shred -vfz -n 5 sensitive.txt  # حذف آمن`}
            securityTip="rm لا يحذف البيانات فعلياً - استخدم shred للحذف الآمن للملفات الحساسة"
          />
        </Section>

        <Section id="viewing" title="قراءة ومعالجة الملفات" icon={FileText} commandCount={4}>
          <CommandBlock
            id="cat"
            command="cat"
            category="files"
            description="عرض محتوى الملف - الأكثر استخداماً"
            example={`$ cat /etc/passwd
$ cat secret.txt | base64  # تشفير base64`}
            securityTip="ملف /etc/passwd يحتوي على أسماء المستخدمين - نقطة بداية للهجمات"
          />

          <CommandBlock
            id="less"
            command="less"
            category="files"
            description="عرض الملفات الكبيرة بشكل تفاعلي"
            example={`$ less /var/log/auth.log
# / للبحث
# n للنتيجة التالية
# q للخروج`}
            securityTip="auth.log يسجل محاولات تسجيل الدخول - مفيد لاكتشاف محاولات الاختراق"
          />

          <CommandBlock
            id="head-tail"
            command="head / tail"
            category="files"
            description="عرض بداية أو نهاية الملف"
            example={`$ head -n 20 access.log
$ tail -f /var/log/apache2/access.log  # متابعة حية`}
            securityTip="tail -f مثالي لمراقبة السجلات live أثناء الاختبارات"
          />

          <CommandBlock
            id="wc"
            command="wc"
            category="files"
            description="عد الأسطر والكلمات والأحرف"
            example={`$ wc -l passwords.txt
$ cat rockyou.txt | wc -l  # عد كلمات المرور`}
            securityTip="مفيد لمعرفة حجم قوائم كلمات المرور قبل الهجوم"
          />
        </Section>

        <Section id="permissions" title="الصلاحيات والأمان" icon={Lock} commandCount={3}>
          <CommandBlock
            id="chmod"
            command="chmod"
            category="security"
            description="تغيير صلاحيات الملفات - أساسي للأمان"
            example={`$ chmod 755 script.sh      # rwxr-xr-x
$ chmod +x exploit.py      # قابل للتنفيذ
$ chmod 600 private_key    # خاص فقط
$ chmod 4755 /bin/su       # SUID bit`}
            securityTip="ابحث عن ملفات SUID (4755) في النظام - يمكن استغلالها لرفع الصلاحيات"
          />

          <CommandBlock
            id="chown"
            command="chown"
            category="security"
            description="تغيير مالك الملف"
            example={`$ sudo chown root:root payload.sh
$ sudo chown -R www-data:www-data /var/www/`}
            securityTip="www-data هو مستخدم خادم الويب - ملفاته هدف شائع"
          />

          <CommandBlock
            id="umask"
            command="umask"
            category="security"
            description="تحديد الصلاحيات الافتراضية للملفات الجديدة"
            example={`$ umask
0022
$ umask 077  # ملفات جديدة خاصة فقط`}
            securityTip="umask 077 يجعل جميع ملفاتك الجديدة غير قابلة للقراءة من الآخرين"
          />
        </Section>

        <Section id="search" title="البحث والتحليل" icon={Search} commandCount={3}>
          <CommandBlock
            id="find"
            command="find"
            category="security"
            description="البحث القوي عن الملفات"
            example={`$ find / -perm -4000 2>/dev/null  # ملفات SUID
$ find /home -name "*.ssh" -type d
$ find . -name "*.php" -exec grep -l "eval" {} \\;`}
            securityTip="البحث عن ملفات SUID هو أول خطوة في استغلال رفع الصلاحيات"
          />

          <CommandBlock
            id="grep"
            command="grep"
            category="security"
            description="البحث عن نصوص داخل الملفات"
            example={`$ grep -r "password" /var/www/
$ grep -i "error" /var/log/*.log
$ cat access.log | grep "404" | wc -l`}
            securityTip="ابحث عن كلمات مثل password, token, api_key في الكود المصدري"
          />

          <CommandBlock
            id="locate"
            command="locate"
            category="security"
            description="بحث سريع جداً (يستخدم قاعدة بيانات)"
            example={`$ locate passwd
$ sudo updatedb  # تحديث القاعدة
$ locate -i *.conf`}
            securityTip="أسرع من find لكن يحتاج updatedb أولاً"
          />
        </Section>

        <Section id="network" title="أوامر الشبكات" icon={Network} commandCount={5}>
          <CommandBlock
            id="ping"
            command="ping"
            category="network"
            description="اختبار الاتصال واكتشاف الأجهزة النشطة"
            example={`$ ping -c 4 192.168.1.1
$ ping -s 65500 target.com  # flood ping`}
            securityTip="استخدمه لاكتشاف الأجهزة النشطة في الشبكة"
          />

          <CommandBlock
            id="netstat"
            command="netstat"
            category="network"
            description="عرض الاتصالات النشطة والبورتات المفتوحة"
            example={`$ netstat -tuln  # البورتات المفتوحة
$ netstat -antp  # مع العمليات
$ ss -tuln       # البديل الحديث`}
            securityTip="ابحث عن بورتات مشبوهة مفتوحة - قد تكون backdoors"
          />

          <CommandBlock
            id="ifconfig"
            command="ip addr"
            category="network"
            description="عرض وتعديل إعدادات الشبكة"
            example={`$ ip addr show
$ ip addr add 192.168.1.100/24 dev eth0
$ ip route show  # الـ routing table`}
            securityTip="ip هو الأمر الحديث بدلاً من ifconfig"
          />

          <CommandBlock
            id="curl"
            command="curl"
            category="network"
            description="أداة قوية لاختبار تطبيقات الويب"
            example={`$ curl -I https://target.com  # headers فقط
$ curl -X POST -d "user=admin&pass=123" url
$ curl -A "Mozilla/5.0" target.com  # تغيير User-Agent`}
            securityTip="استخدمه لاختبار SQL Injection, XSS, وثغرات أخرى"
          />

          <CommandBlock
            id="wget"
            command="wget"
            category="network"
            description="تحميل ملفات وصفحات ويب كاملة"
            example={`$ wget https://example.com/file.zip
$ wget -r -np -k https://site.com  # نسخ موقع كامل
$ wget -O- http://target.com/page.php`}
            securityTip="استخدمه لتحميل أدوات الاختراق على الهدف أو نسخ المواقع للتحليل"
          />
        </Section>

        <Section id="system" title="معلومات ومراقبة النظام" icon={FolderTree} commandCount={2}>
          <CommandBlock
            id="ps"
            command="ps aux"
            category="security"
            description="عرض جميع العمليات النشطة"
            example={`$ ps aux | grep apache
$ ps -ef --forest  # شجرة العمليات
$ pstree           # عرض بصري`}
            securityTip="ابحث عن عمليات مشبوهة أو backdoors قيد التشغيل"
          />

          <CommandBlock
            id="top"
            command="top / htop"
            category="security"
            description="مراقبة النظام في الوقت الفعلي"
            example={`$ top
$ htop           # أفضل وأجمل
$ top -u www-data  # عمليات مستخدم معين`}
            securityTip="راقب استهلاك الموارد - نشاط غير عادي قد يدل على اختراق"
          />
        </Section>

        {/* Cheat Sheet */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-purple-600 to-pink-600'} text-white rounded-2xl p-8 shadow-2xl`}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Terminal className="w-8 h-8" />
            الأوامر الأكثر استخداماً في الاختبارات
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-5">
              <h3 className="font-bold mb-3 text-lg flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                استكشاف النظام
              </h3>
              <div className="space-y-2 text-sm font-mono">
                <div>ls -la</div>
                <div>find / -perm -4000</div>
                <div>ps aux</div>
                <div>netstat -tuln</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-5">
              <h3 className="font-bold mb-3 text-lg flex items-center gap-2">
                <Search className="w-5 h-5" />
                البحث عن المعلومات
              </h3>
              <div className="space-y-2 text-sm font-mono">
                <div>grep -r "password"</div>
                <div>cat /etc/passwd</div>
                <div>locate *.conf</div>
                <div>find . -name "*.log"</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-5">
              <h3 className="font-bold mb-3 text-lg flex items-center gap-2">
                <Network className="w-5 h-5" />
                الشبكات
              </h3>
              <div className="space-y-2 text-sm font-mono">
                <div>curl -I target.com</div>
                <div>wget file.zip</div>
                <div>ping -c 4 host</div>
                <div>ip addr show</div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold mb-1">نصيحة للمحترفين</div>
                <div className="text-sm opacity-90">
                  احفظ الأوامر الأكثر استخداماً في ملف notes.txt واستخدم <code className="bg-white/20 px-2 py-1 rounded">history</code> 
                  لمراجعة الأوامر السابقة. استخدم Ctrl+R للبحث في تاريخ الأوامر.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-2xl shadow-xl p-8 mt-8 border-2`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            الخطوات التالية في رحلتك
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`${darkMode ? 'border-green-700 bg-gray-900/50' : 'border-green-200 bg-green-50'} border-2 rounded-xl p-6 hover:shadow-lg transition-all`}>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Shell Scripting
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                تعلم كتابة سكريبتات Bash لأتمتة مهام الاختبارات
              </p>
            </div>

            <div className={`${darkMode ? 'border-blue-700 bg-gray-900/50' : 'border-blue-200 bg-blue-50'} border-2 rounded-xl p-6 hover:shadow-lg transition-all`}>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <h3 className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                أدوات متقدمة
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                تعمق في أدوات مثل awk, sed, vim للتحليل المتقدم
              </p>
            </div>

            <div className={`${darkMode ? 'border-purple-700 bg-gray-900/50' : 'border-purple-200 bg-purple-50'} border-2 rounded-xl p-6 hover:shadow-lg transition-all`}>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                أدوات الاختراق
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Nmap, Metasploit, Burp Suite وأدوات Kali Linux
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Banner */}
        {completedCommands.length === totalCommands && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-2xl animate-bounce">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8" />
              <span className="font-bold text-lg">
                مبروك! أكملت جميع الأوامر 🎉
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinuxFundamentals;