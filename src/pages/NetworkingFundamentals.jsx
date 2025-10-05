import React, { useState, useEffect } from 'react';
import { Network, AlertTriangle, Code, Zap, Server, Smartphone, Wifi, ChevronRight, ChevronDown, ChevronUp, Terminal, Globe, Lock, ArrowUp, Menu, X, Play, CheckCircle, XCircle, Award, Lightbulb, Target, Shield } from 'lucide-react';

const NetworkingFundamentals = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [animationStep, setAnimationStep] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [osiAnimation, setOsiAnimation] = useState(0);
  const [tcpAnimation, setTcpAnimation] = useState(0);
  const [dnsAnimation, setDnsAnimation] = useState(0);
  const [httpDemo, setHttpDemo] = useState({ method: 'GET', url: 'https://api.example.com/users', response: null, loading: false });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
      setOsiAnimation(prev => (prev + 1) % 8);
      setTcpAnimation(prev => (prev + 1) % 4);
      setDnsAnimation(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setShowTOC(false);
    }
  };

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const simulateHTTP = () => {
    setHttpDemo(prev => ({ ...prev, loading: true, response: null }));
    setTimeout(() => {
      setHttpDemo(prev => ({
        ...prev,
        loading: false,
        response: {
          status: 200,
          statusText: 'OK',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'X-Response-Time': '45ms'
          },
          body: {
            success: true,
            data: [
              { id: 1, name: 'أحمد', email: 'ahmed@example.com' },
              { id: 2, name: 'فاطمة', email: 'fatima@example.com' }
            ]
          }
        }
      }));
    }, 1500);
  };

  const quizzes = {
    'what-is-network': {
      question: 'ما هو أكبر WAN في العالم؟',
      options: ['LAN', 'الإنترنت', 'MAN', 'WiFi'],
      correct: 1,
      explanation: 'الإنترنت هو أكبر WAN (Wide Area Network) في العالم، يربط ملايين الشبكات حول العالم'
    },
    'osi-model': {
      question: 'أي طبقة مسؤولة عن تشفير البيانات؟',
      options: ['Application', 'Presentation', 'Transport', 'Network'],
      correct: 1,
      explanation: 'طبقة Presentation (Layer 6) مسؤولة عن التشفير والترجمة وضغط البيانات'
    },
    'data-transmission': {
      question: 'ما هو البروتوكول الأسرع؟',
      options: ['TCP', 'UDP', 'HTTP', 'FTP'],
      correct: 1,
      explanation: 'UDP أسرع من TCP لأنه لا يحتاج handshake ولا يضمن التوصيل'
    },
    'internet-journey': {
      question: 'ما هي أول خطوة عند كتابة google.com؟',
      options: ['TCP Handshake', 'DNS Lookup', 'TLS Handshake', 'HTTP Request'],
      correct: 1,
      explanation: 'DNS Lookup هي الخطوة الأولى لتحويل google.com إلى IP Address'
    },
    'http-details': {
      question: 'أي Status Code يعني "غير موجود"؟',
      options: ['200', '404', '500', '301'],
      correct: 1,
      explanation: '404 Not Found يعني أن المورد المطلوب غير موجود على السيرفر'
    },
    'auth': {
      question: 'أيهما Stateless؟',
      options: ['Session-Based', 'JWT', 'Cookies', 'كلهم Stateful'],
      correct: 1,
      explanation: 'JWT هو Stateless لأنه يحمل كل البيانات ولا يحتاج database'
    }
  };

  const handleQuizAnswer = (sectionId, selectedIndex) => {
    const quiz = quizzes[sectionId];
    const isCorrect = selectedIndex === quiz.correct;
    setActiveQuiz(prev => ({ ...prev, [sectionId]: selectedIndex }));
    setQuizResults(prev => ({ ...prev, [sectionId]: isCorrect }));
  };

  const realWorldScenarios = {
    'ddos-protection': {
      title: 'كيف تحمي موقعك من DDoS؟',
      icon: Shield,
      problem: 'موقعك يتعرض لهجوم DDoS - آلاف الطلبات في الثانية!',
      steps: [
        { step: 'استخدم CDN (Cloudflare)', why: 'يوزع الحمل ويمتص الهجوم' },
        { step: 'فعّل Rate Limiting', why: 'يحد من عدد الطلبات من نفس IP' },
        { step: 'استخدم WAF', why: 'Web Application Firewall يفلتر الطلبات الخبيثة' },
        { step: 'قم بـ IP Blacklisting', why: 'امنع IPs المهاجمة' },
        { step: 'Scale horizontally', why: 'أضف سيرفرات أكثر لتوزيع الحمل' }
      ],
      tools: ['Cloudflare', 'AWS Shield', 'Nginx rate limiting', 'Fail2ban']
    },
    'secure-api': {
      title: 'كيف تؤمن API الخاص بك؟',
      icon: Lock,
      problem: 'API مفتوح للعامة - كيف تحميه؟',
      steps: [
        { step: 'استخدم HTTPS فقط', why: 'تشفير كل البيانات' },
        { step: 'أضف Authentication', why: 'JWT أو API Keys' },
        { step: 'فعّل CORS بحذر', why: 'حدد المصادر المسموحة فقط' },
        { step: 'استخدم Rate Limiting', why: 'منع الاستخدام المفرط' },
        { step: 'Validate Input', why: 'منع SQL Injection وXSS' },
        { step: 'أضف Security Headers', why: 'CSP, X-Frame-Options, etc.' }
      ],
      tools: ['Express.js middleware', 'Helmet.js', 'express-rate-limit', 'Joi validation']
    },
    'password-breach': {
      title: 'ماذا تفعل بعد تسريب Database؟',
      icon: AlertTriangle,
      problem: 'قاعدة البيانات تسربت! كلمات المرور مكشوفة!',
      steps: [
        { step: 'أوقف السيرفر فوراً', why: 'منع المزيد من الضرر' },
        { step: 'أخطر المستخدمين', why: 'شفافية وثقة' },
        { step: 'أجبر Password Reset', why: 'لكل المستخدمين' },
        { step: 'راجع الكود', why: 'ابحث عن الثغرة' },
        { step: 'حسّن الأمان', why: 'استخدم bcrypt/Argon2، أضف 2FA' },
        { step: 'راقب بنوك Credentials', why: 'هل بياناتك استُخدمت؟' }
      ],
      tools: ['Have I Been Pwned', 'Security audit tools', '2FA libraries']
    }
  };

  const labs = {
    'network-basics': {
      title: 'Lab 1: فحص شبكتك المحلية',
      difficulty: 'سهل',
      time: '10 دقائق',
      objective: 'تعلم أوامر أساسية لفحص الشبكة',
      steps: [
        { command: 'ipconfig', description: 'عرض معلومات IP الخاص بك (Windows)', expected: 'IP Address, Subnet Mask, Gateway' },
        { command: 'ifconfig', description: 'نفس الأمر على Mac/Linux', expected: 'inet, netmask, broadcast' },
        { command: 'ping google.com', description: 'فحص الاتصال بالإنترنت', expected: 'Reply with time in ms' },
        { command: 'traceroute google.com', description: 'تتبع مسار الطلب', expected: 'List of hops/routers' },
        { command: 'nslookup google.com', description: 'الحصول على IP من Domain', expected: 'IP addresses' }
      ],
      solution: 'ستحصل على معلومات شبكتك وترى كيف تنتقل البيانات عبر الراوترات'
    },
    'http-practice': {
      title: 'Lab 2: إرسال HTTP Requests',
      difficulty: 'متوسط',
      time: '15 دقيقة',
      objective: 'تعلم إرسال طلبات HTTP بطرق مختلفة',
      steps: [
        { command: 'curl https://api.github.com', description: 'GET request بسيط', expected: 'JSON response' },
        { command: 'curl -X POST -H "Content-Type: application/json" -d \'{"name":"test"}\' url', description: 'POST request', expected: 'Success response' },
        { command: 'curl -I https://google.com', description: 'Headers فقط', expected: 'Status code + headers' },
        { command: 'curl -v https://google.com', description: 'Verbose mode', expected: 'All request/response details' }
      ],
      solution: 'استخدم Postman أو Insomnia كبديل visual'
    },
    'security-headers': {
      title: 'Lab 3: فحص Security Headers',
      difficulty: 'متوسط',
      time: '10 دقائق',
      objective: 'فحص أمان المواقع',
      steps: [
        { command: 'curl -I https://facebook.com', description: 'فحص headers', expected: 'Strict-Transport-Security, X-Frame-Options' },
        { command: 'استخدم securityheaders.com', description: 'فحص شامل', expected: 'Grade A-F' },
        { command: 'افحص موقعك', description: 'هل لديك Security Headers؟', expected: 'تقييم الأمان' }
      ],
      solution: 'أضف headers مثل CSP, HSTS, X-Content-Type-Options'
    }
  };

  const sections = [
    {
      id: 'what-is-network',
      title: '1. ما هي الشبكة والإنترنت؟',
      icon: Network,
      content: {
        intro: 'الشبكة هي مجموعة من الأجهزة المتصلة ببعضها البعض لتبادل البيانات والموارد.',
        types: [
          { name: 'LAN', desc: 'شبكة محلية', emoji: '🏠', example: 'شبكة البيت' },
          { name: 'WAN', desc: 'شبكة واسعة', emoji: '🌍', example: 'الإنترنت' },
          { name: 'MAN', desc: 'شبكة حضرية', emoji: '🏙️', example: 'شبكة جامعة' }
        ],
        attacks: [
          { name: 'Network Sniffing', description: 'التنصت على البيانات', damage: '🔴 سرقة بيانات' },
          { name: 'MITM', description: 'المهاجم في المنتصف', damage: '🔴 تعديل البيانات' }
        ]
      }
    },
    {
      id: 'osi-model',
      title: '2. نموذج OSI',
      icon: Lock,
      content: {
        intro: 'نموذج OSI يصف كيف تتواصل الشبكات في 7 طبقات.',
        layers: [
          { number: 7, name: 'Application', nameAr: 'التطبيق', emoji: '📱', protocols: ['HTTP', 'DNS', 'SSH'] },
          { number: 6, name: 'Presentation', nameAr: 'العرض', emoji: '🎭', protocols: ['SSL/TLS', 'JPEG'] },
          { number: 5, name: 'Session', nameAr: 'الجلسة', emoji: '🔗', protocols: ['NetBIOS', 'RPC'] },
          { number: 4, name: 'Transport', nameAr: 'النقل', emoji: '🚚', protocols: ['TCP', 'UDP'] },
          { number: 3, name: 'Network', nameAr: 'الشبكة', emoji: '🗺️', protocols: ['IP', 'ICMP'] },
          { number: 2, name: 'Data Link', nameAr: 'الارتباط', emoji: '🔌', protocols: ['Ethernet', 'WiFi'] },
          { number: 1, name: 'Physical', nameAr: 'الفيزيائية', emoji: '⚡', protocols: ['Cable', 'Fiber'] }
        ]
      }
    },
    {
      id: 'data-transmission',
      title: '3. عملية تراسل البيانات',
      icon: Zap,
      content: {
        tcpHandshake: {
          steps: [
            { num: 1, name: 'SYN', message: 'مرحباً؟', color: 'blue' },
            { num: 2, name: 'SYN-ACK', message: 'مرحباً! جاهز؟', color: 'purple' },
            { num: 3, name: 'ACK', message: 'جاهز! لنبدأ', color: 'green' }
          ]
        }
      }
    },
    {
      id: 'internet-journey',
      title: '4. رحلة الإنترنت',
      icon: Globe,
      content: {
        stages: [
          { num: 1, name: 'DHCP', emoji: '💻', desc: 'الحصول على IP' },
          { num: 2, name: 'DNS', emoji: '🔍', desc: 'تحويل Domain لـ IP' },
          { num: 3, name: 'ARP', emoji: '🔌', desc: 'معرفة MAC Address' },
          { num: 4, name: 'TCP', emoji: '🤝', desc: 'إنشاء الاتصال' },
          { num: 5, name: 'TLS', emoji: '🔐', desc: 'التشفير' }
        ]
      }
    },
    {
      id: 'http-details',
      title: '5. HTTP بالتفصيل',
      icon: Server,
      content: {
        methods: [
          { method: 'GET', use: 'طلب بيانات', example: 'فتح صفحة' },
          { method: 'POST', use: 'إرسال بيانات', example: 'تسجيل دخول' },
          { method: 'PUT', use: 'تحديث', example: 'تعديل ملف' },
          { method: 'DELETE', use: 'حذف', example: 'حذف حساب' }
        ]
      }
    },
    {
      id: 'auth',
      title: '6. Authentication',
      icon: Lock,
      content: {
        intro: 'التحقق من الهوية والصلاحيات'
      }
    }
  ];

  const Section = ({ section, children }) => {
    const Icon = section.icon;
    const isExpanded = expandedSections[section.id] ?? false;
    const quiz = quizzes[section.id];
    const selectedAnswer = activeQuiz[section.id];
    const quizResult = quizResults[section.id];

    return (
      <div id={section.id} className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border-2 border-gray-100">
        <button
          onClick={() => toggleSection(section.id)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
          </div>
          {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </button>

        {isExpanded && (
          <div className="p-6 border-t border-gray-100">
            {children}

            {/* Quiz Section */}
            {quiz && (
              <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-purple-600" />
                  اختبر معلوماتك
                </h3>
                <p className="text-lg font-semibold mb-4">{quiz.question}</p>
                <div className="space-y-3">
                  {quiz.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(section.id, idx)}
                      disabled={selectedAnswer !== undefined}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        selectedAnswer === undefined
                          ? 'bg-white hover:bg-purple-100 border-2 border-gray-200'
                          : selectedAnswer === idx
                          ? idx === quiz.correct
                            ? 'bg-green-100 border-2 border-green-500'
                            : 'bg-red-100 border-2 border-red-500'
                          : idx === quiz.correct
                          ? 'bg-green-100 border-2 border-green-500'
                          : 'bg-gray-100 border-2 border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {selectedAnswer !== undefined && idx === quiz.correct && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {selectedAnswer === idx && idx !== quiz.correct && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {selectedAnswer !== undefined && (
                  <div className={`mt-4 p-4 rounded-lg ${quizResult ? 'bg-green-50 border-l-4 border-green-500' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                    <p className="font-semibold mb-2">
                      {quizResult ? '✅ إجابة صحيحة!' : '💡 الإجابة الصحيحة:'}
                    </p>
                    <p className="text-sm">{quiz.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white py-12 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Network className="w-12 h-12" />
              <div>
                <h1 className="text-4xl font-bold">أساسيات الشبكات</h1>
                <p className="text-blue-100 text-sm mt-1">دليل تفاعلي شامل</p>
              </div>
            </div>
            <button
              onClick={() => setShowTOC(!showTOC)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            >
              {showTOC ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Table of Contents Sidebar */}
      {showTOC && (
        <div className="fixed top-24 right-0 w-80 bg-white shadow-2xl rounded-l-xl p-6 z-50 max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">المحتويات</h3>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="w-full text-right p-3 hover:bg-blue-50 rounded-lg transition-all"
              >
                {section.title}
              </button>
            ))}
            <hr className="my-4" />
            <button onClick={() => scrollToSection('scenarios')} className="w-full text-right p-3 hover:bg-blue-50 rounded-lg">
              السيناريوهات العملية
            </button>
            <button onClick={() => scrollToSection('labs')} className="w-full text-right p-3 hover:bg-blue-50 rounded-lg">
              المختبرات العملية
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* OSI Model Visualization */}
        <div className="mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="text-2xl font-bold mb-6 text-center">رحلة البيانات عبر OSI Model</h3>
          <div className="flex items-center justify-between">
            {[7, 6, 5, 4, 3, 2, 1].map((layer, idx) => (
              <div key={layer} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold text-white transition-all duration-500 ${
                    osiAnimation === idx ? 'bg-gradient-to-br from-blue-500 to-cyan-600 scale-125 shadow-lg' : 'bg-gray-400'
                  }`}
                >
                  L{layer}
                </div>
                <span className="text-xs mt-2">{sections[1].content.layers.find(l => l.number === layer)?.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            البيانات تنتقل من Layer 7 إلى Layer 1 عند الإرسال، والعكس عند الاستقبال
          </div>
        </div>

        {/* TCP Handshake Animation */}
        <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
          <h3 className="text-2xl font-bold mb-6 text-center">TCP Three-Way Handshake</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-blue-500 rounded-full">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold">Client</span>
            </div>

            <div className="flex-1 mx-8 relative">
              {/* SYN */}
              <div className={`mb-4 transition-all duration-1000 ${tcpAnimation >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-blue-500 rounded"></div>
                  <ChevronRight className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-sm text-blue-600 font-semibold mt-1">1. SYN →</div>
              </div>

              {/* SYN-ACK */}
              <div className={`mb-4 transition-all duration-1000 ${tcpAnimation >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center flex-row-reverse">
                  <div className="flex-1 h-2 bg-purple-500 rounded"></div>
                  <ChevronRight className="w-6 h-6 text-purple-500 rotate-180" />
                </div>
                <div className="text-sm text-purple-600 font-semibold mt-1 text-right">← 2. SYN-ACK</div>
              </div>

              {/* ACK */}
              <div className={`transition-all duration-1000 ${tcpAnimation >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-green-500 rounded"></div>
                  <ChevronRight className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-sm text-green-600 font-semibold mt-1">3. ACK →</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-green-500 rounded-full">
                <Server className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold">Server</span>
            </div>
          </div>
          <div className={`mt-6 text-center transition-all duration-500 ${tcpAnimation >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-green-100 p-4 rounded-lg inline-block">
              <CheckCircle className="w-6 h-6 text-green-600 inline mr-2" />
              <span className="font-bold text-green-700">الاتصال جاهز! 🎉</span>
            </div>
          </div>
        </div>

        {/* DNS Lookup Animation */}
        <div className="mb-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
          <h3 className="text-2xl font-bold mb-6 text-center">DNS Lookup Process</h3>
          <div className="grid grid-cols-5 gap-4">
            {['Browser Cache', 'OS Cache', 'DNS Resolver', 'Root Server', 'Result'].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-lg flex items-center justify-center transition-all duration-500 ${
                    dnsAnimation === idx
                      ? 'bg-gradient-to-br from-purple-500 to-pink-600 scale-110 shadow-xl'
                      : 'bg-gray-300'
                  }`}
                >
                  {idx === 0 && <Globe className={`w-8 h-8 ${dnsAnimation === idx ? 'text-white' : 'text-gray-500'}`} />}
                  {idx === 1 && <Server className={`w-8 h-8 ${dnsAnimation === idx ? 'text-white' : 'text-gray-500'}`} />}
                  {idx === 2 && <Network className={`w-8 h-8 ${dnsAnimation === idx ? 'text-white' : 'text-gray-500'}`} />}
                  {idx === 3 && <Globe className={`w-8 h-8 ${dnsAnimation === idx ? 'text-white' : 'text-gray-500'}`} />}
                  {idx === 4 && <CheckCircle className={`w-8 h-8 ${dnsAnimation === idx ? 'text-white' : 'text-gray-500'}`} />}
                </div>
                <span className="text-xs mt-2 text-center font-semibold">{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <div className={`bg-purple-100 p-4 rounded-lg inline-block transition-all ${dnsAnimation === 4 ? 'opacity-100' : 'opacity-30'}`}>
              <span className="font-bold text-purple-700">google.com → 142.250.185.46</span>
            </div>
          </div>
        </div>


        {/* Main Sections */}
        {sections.map((section) => (
          <Section key={section.id} section={section}>
            {section.id === 'what-is-network' && (
              <div className="space-y-6">
                <p className="text-lg text-gray-700">{section.content.intro}</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {section.content.types.map((type, idx) => (
                    <div key={idx} className="bg-gray-50 p-5 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
                      <div className="text-4xl mb-3">{type.emoji}</div>
                      <h4 className="font-bold text-lg mb-2">{type.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{type.desc}</p>
                      <div className="text-xs bg-white p-2 rounded">
                        <span className="font-semibold">مثال: </span>{type.example}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-700">
                    <AlertTriangle className="w-6 h-6" />
                    الهجمات الشائعة
                  </h3>
                  {section.content.attacks.map((attack, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg mb-3 border-l-4 border-red-500">
                      <h4 className="font-bold text-red-600">{attack.name}</h4>
                      <p className="text-sm text-gray-700">{attack.description}</p>
                      <p className="text-sm text-red-600 font-semibold">{attack.damage}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section.id === 'osi-model' && (
              <div className="space-y-4">
                <p className="text-lg text-gray-700">{section.content.intro}</p>
                {section.content.layers.map((layer) => (
                  <div key={layer.number} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 flex items-center gap-4">
                      <div className="text-4xl">{layer.emoji}</div>
                      <div>
                        <span className="text-xl font-bold text-blue-600">Layer {layer.number}</span>
                        <h4 className="text-lg font-bold">{layer.name}</h4>
                        <p className="text-sm text-gray-600">{layer.nameAr}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {layer.protocols.map((protocol, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.id === 'data-transmission' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">TCP vs UDP</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                      <div className="text-3xl mb-2">🐢</div>
                      <h4 className="text-xl font-bold text-blue-600">TCP</h4>
                      <ul className="text-sm mt-3 space-y-1">
                        <li>✓ موثوق</li>
                        <li>✓ يضمن الترتيب</li>
                        <li>✓ 3-Way Handshake</li>
                        <li>✗ بطيء نسبياً</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                      <div className="text-3xl mb-2">🚀</div>
                      <h4 className="text-xl font-bold text-green-600">UDP</h4>
                      <ul className="text-sm mt-3 space-y-1">
                        <li>✓ سريع جداً</li>
                        <li>✓ بدون Handshake</li>
                        <li>✗ لا يضمن الوصول</li>
                        <li>✗ قد يفقد البيانات</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {section.id === 'internet-journey' && (
              <div className="space-y-4">
                {section.content.stages.map((stage) => (
                  <div key={stage.num} className="bg-gradient-to-r from-white to-gray-50 rounded-xl border-2 border-gray-200 p-5">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-4xl">{stage.emoji}</div>
                      <div>
                        <span className="text-sm text-gray-500">المرحلة {stage.num}</span>
                        <h4 className="text-xl font-bold">{stage.name}</h4>
                      </div>
                    </div>
                    <p className="text-gray-700">{stage.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {section.id === 'http-details' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {section.content.methods.map((method, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border-2 border-gray-200">
                      <h4 className="text-xl font-bold text-blue-600 mb-2">{method.method}</h4>
                      <p className="text-sm text-gray-600 mb-2">{method.use}</p>
                      <div className="text-xs bg-gray-50 p-2 rounded">
                        مثال: {method.example}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section.id === 'auth' && (
              <div className="space-y-6">
                <p className="text-lg text-gray-700 whitespace-pre-line">{section.content.intro}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                    <h4 className="text-xl font-bold text-purple-600 mb-3">Session-Based</h4>
                    <ul className="space-y-2 text-sm">
                      <li>✓ سهل التطبيق</li>
                      <li>✓ آمن في Server</li>
                      <li>✗ يحتاج Database</li>
                      <li>✗ صعب للـ Scaling</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                    <h4 className="text-xl font-bold text-blue-600 mb-3">JWT</h4>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Stateless</li>
                      <li>✓ سهل للـ Scaling</li>
                      <li>✗ لا يمكن إلغاؤه</li>
                      <li>✗ خطر XSS</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Section>
        ))}

        {/* Real-World Scenarios */}
        <div id="scenarios" className="mt-12 mb-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Target className="w-8 h-8 text-green-600" />
            سيناريوهات عملية من الواقع
          </h2>
          <div className="space-y-6">
            {Object.entries(realWorldScenarios).map(([key, scenario]) => {
              const Icon = scenario.icon;
              return (
                <div key={key} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-700">
                    <Icon className="w-6 h-6" />
                    {scenario.title}
                  </h3>
                  
                  <div className="bg-red-100 p-4 rounded-lg mb-4 border-l-4 border-red-500">
                    <p className="font-bold text-red-700">⚠️ المشكلة:</p>
                    <p className="text-red-800">{scenario.problem}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg mb-4">
                    <p className="font-bold text-green-700 mb-3">✅ الحل:</p>
                    <ol className="space-y-3">
                      {scenario.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{step.step}</p>
                            <p className="text-sm text-gray-600">لماذا؟ {step.why}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-bold text-blue-700 mb-2">🛠️ الأدوات المستخدمة:</p>
                    <div className="flex flex-wrap gap-2">
                      {scenario.tools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Labs/Exercises */}
        <div id="labs" className="mt-12 mb-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-purple-600" />
            مختبرات عملية - طبق بنفسك!
          </h2>
          <div className="space-y-6">
            {Object.entries(labs).map(([key, lab]) => (
              <div key={key} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-purple-700">{lab.title}</h3>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lab.difficulty === 'سهل' ? 'bg-green-100 text-green-700' :
                      lab.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {lab.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      ⏱️ {lab.time}
                    </span>
                  </div>
                </div>

                <div className="bg-purple-100 p-4 rounded-lg mb-4">
                  <p className="font-bold text-purple-700">🎯 الهدف:</p>
                  <p className="text-purple-900">{lab.objective}</p>
                </div>

                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="font-bold mb-3">📝 الخطوات:</p>
                  <div className="space-y-4">
                    {lab.steps.map((step, idx) => (
                      <div key={idx} className="border-l-4 border-purple-400 pl-4">
                        <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-sm mb-2">
                          $ {step.command}
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{step.description}</p>
                        <p className="text-xs text-gray-500">متوقع: {step.expected}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="font-bold text-green-700 mb-2">💡 الحل:</p>
                  <p className="text-sm text-green-800">{lab.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            نصائح مهمة للمبتدئين
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold mb-2">🔍 ابدأ بالتجربة</p>
              <p className="text-sm text-gray-700">استخدم Wireshark لمراقبة شبكتك، افتح DevTools في المتصفح</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold mb-2">📚 اقرأ الـ RFCs</p>
              <p className="text-sm text-gray-700">المواصفات الرسمية للبروتوكولات - RFC 2616 لـ HTTP</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold mb-2">🛠️ استخدم الأدوات</p>
              <p className="text-sm text-gray-700">Postman, curl, netcat, nmap - جربها كلها!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold mb-2">💪 مارس كل يوم</p>
              <p className="text-sm text-gray-700">10 دقائق يومياً أفضل من 5 ساعات مرة واحدة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 group"
        >
          <ArrowUp className="w-6 h-6 group-hover:translate-y-[-4px] transition-transform" />
        </button>
      )}

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">🎉 مبروك! استمتعت بالموقع؟</h3>
          <p className="text-gray-300 mb-6">
            الآن لديك فهم عميق لأساسيات الشبكات مع تطبيقات عملية
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl mb-2">📚</div>
              <div className="font-bold">6 موديولات</div>
              <div className="text-sm text-gray-400">شاملة ومفصلة</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl mb-2">🎬</div>
              <div className="font-bold">Animations</div>
              <div className="text-sm text-gray-400">تفاعلية وواضحة</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl mb-2">🧪</div>
              <div className="font-bold">Labs عملية</div>
              <div className="text-sm text-gray-400">طبق بنفسك</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-bold">Quizzes</div>
              <div className="text-sm text-gray-400">اختبر معلوماتك</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingFundamentals;