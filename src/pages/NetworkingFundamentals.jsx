// src/pages/NetworkingFundamentals.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Network, AlertTriangle, CheckCircle, BookOpen, Code, Zap, Eye, Server, Smartphone, Wifi, ChevronRight, ChevronDown, ChevronUp, Terminal, Globe, Lock } from 'lucide-react';

const NetworkingFundamentals = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [completedSections, setCompletedSections] = useState(() => {
    const saved = localStorage.getItem('networkingProgress');
    return saved ? JSON.parse(saved) : [];
  });
  const [expandedSections, setExpandedSections] = useState({});
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('networkingProgress', JSON.stringify(completedSections));
  }, [completedSections]);

  const toggleComplete = (sectionId) => {
    if (completedSections.includes(sectionId)) {
      setCompletedSections(completedSections.filter(id => id !== sectionId));
    } else {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    {
      id: 'what-is-network',
      title: '1. ما هي الشبكة والإنترنت؟',
      icon: Network,
      content: {
        intro: `الشبكة هي مجموعة من الأجهزة المتصلة ببعضها البعض لتبادل البيانات والموارد. تخيل الشبكة كطرق تربط بين المدن، حيث تنتقل السيارات (البيانات) من مكان لآخر.`,
        
        types: [
          {
            name: 'LAN (Local Area Network)',
            desc: 'شبكة محلية صغيرة - مثل شبكة البيت أو المكتب',
            emoji: '🏠',
            example: 'جهازك + راوتر + طابعة في نفس المكان'
          },
          {
            name: 'WAN (Wide Area Network)',
            desc: 'شبكة واسعة تغطي مناطق جغرافية كبيرة',
            emoji: '🌍',
            example: 'الإنترنت هو أكبر WAN في العالم'
          },
          {
            name: 'MAN (Metropolitan Area Network)',
            desc: 'شبكة تغطي مدينة أو منطقة حضرية',
            emoji: '🏙️',
            example: 'شبكة جامعة موزعة على عدة مباني'
          }
        ],

        attacks: [
          {
            name: 'Network Sniffing',
            description: 'المهاجم يتنصت على البيانات المارة في الشبكة',
            damage: '🔴 سرقة كلمات المرور والبيانات الحساسة',
            howItWorks: 'باستخدام أدوات مثل Wireshark، يلتقط المهاجم كل الـ Packets في الشبكة المحلية',
            realExample: 'في 2011، هاكر في مقهى استخدم Firesheep لسرقة جلسات Facebook من المستخدمين على نفس الـ WiFi'
          },
          {
            name: 'Man-in-the-Middle (MITM)',
            description: 'المهاجم يضع نفسه بين Client و Server',
            damage: '🔴 قراءة وتعديل كل البيانات المتبادلة',
            howItWorks: 'يخدع الضحية أن جهازه هو الراوتر، فكل البيانات تمر عبره أولاً',
            realExample: 'في 2015، تطبيق Lenovo Superfish كان يعمل MITM على كل اتصالات HTTPS للمستخدمين'
          }
        ],

        code: {
          title: 'مثال: إرسال طلب HTTP بسيط',
          code: `import requests

# إرسال طلب GET بسيط
response = requests.get('https://api.github.com')

print(f"Status Code: {response.status_code}")
print(f"Response Time: {response.elapsed.total_seconds()}s")`,
          explanation: `نستخدم مكتبة requests لإرسال طلب HTTP. GET هو نوع الطلب (نطلب بيانات فقط). response يحتوي على رد السيرفر.`
        }
      }
    },
    {
      id: 'osi-model',
      title: '2. نموذج OSI',
      icon: Lock,
      content: {
        intro: `نموذج OSI (Open Systems Interconnection) هو إطار مفاهيمي يصف كيف تتواصل الشبكات. تم تطويره عام 1984 من قبل ISO لتوحيد البروتوكولات.

🎯 **توحيد المعايير**: حتى تتواصل أجهزة من شركات مختلفة
🎯 **تسهيل الفهم**: تقسيم العملية المعقدة لطبقات بسيطة
🎯 **Troubleshooting**: معرفة بالضبط أين المشكلة في الشبكة`,

        layers: [
          {
            number: 7,
            name: 'Application Layer',
            nameAr: 'طبقة التطبيق',
            emoji: '📱',
            description: 'التطبيقات التي يستخدمها المستخدم مباشرة',
            protocols: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'SSH'],
            example: 'عندما تفتح متصفح وتكتب google.com - هنا يبدأ الطلب',
            job: 'توفير واجهة للمستخدم للتواصل مع الشبكة',
            attacks: [
              { name: 'SQL Injection', desc: 'حقن أوامر SQL خبيثة', damage: 'سرقة قاعدة البيانات' },
              { name: 'XSS', desc: 'حقن JavaScript خبيث', damage: 'سرقة cookies' }
            ]
          },
          {
            number: 6,
            name: 'Presentation Layer',
            nameAr: 'طبقة العرض',
            emoji: '🎭',
            description: 'ترجمة وتشفير البيانات',
            protocols: ['SSL/TLS', 'JPEG', 'GIF'],
            example: 'تحويل البيانات من نص لـ encryption',
            job: 'التشفير، الضغط، التحويل',
            attacks: [
              { name: 'SSL Stripping', desc: 'إجبار HTTP بدل HTTPS', damage: 'قراءة البيانات' }
            ]
          },
          {
            number: 5,
            name: 'Session Layer',
            nameAr: 'طبقة الجلسة',
            emoji: '🔗',
            description: 'إدارة الجلسات والاتصالات',
            protocols: ['NetBIOS', 'RPC'],
            example: 'فتح وإغلاق المحادثة بين جهازين',
            job: 'التزامن والحفاظ على الاتصال',
            attacks: [
              { name: 'Session Hijacking', desc: 'سرقة Session ID', damage: 'التحكم بالحساب' }
            ]
          },
          {
            number: 4,
            name: 'Transport Layer',
            nameAr: 'طبقة النقل',
            emoji: '🚚',
            description: 'نقل البيانات بشكل موثوق',
            protocols: ['TCP', 'UDP'],
            example: 'TCP يضمن وصول البيانات كاملة',
            job: 'تقسيم البيانات والتحكم بالتدفق',
            attacks: [
              { name: 'SYN Flood', desc: 'إغراق السيرفر', damage: 'تعطيل (DoS)' }
            ]
          },
          {
            number: 3,
            name: 'Network Layer',
            nameAr: 'طبقة الشبكة',
            emoji: '🗺️',
            description: 'توجيه البيانات عبر الشبكات',
            protocols: ['IP', 'ICMP'],
            example: 'تحديد المسار من جهازك للسيرفر',
            job: 'Routing وAddressing',
            attacks: [
              { name: 'IP Spoofing', desc: 'تزييف IP', damage: 'إخفاء الهوية' }
            ]
          },
          {
            number: 2,
            name: 'Data Link Layer',
            nameAr: 'طبقة الارتباط',
            emoji: '🔌',
            description: 'النقل في الشبكة المحلية',
            protocols: ['Ethernet', 'WiFi', 'MAC'],
            example: 'استخدام MAC Address للتواصل',
            job: 'Frame formatting وMAC addressing',
            attacks: [
              { name: 'ARP Poisoning', desc: 'تزييف ARP', damage: 'MITM' }
            ]
          },
          {
            number: 1,
            name: 'Physical Layer',
            nameAr: 'الطبقة الفيزيائية',
            emoji: '⚡',
            description: 'الأجهزة المادية والإشارات',
            protocols: ['Ethernet Cable', 'Fiber Optic'],
            example: 'الكوابل وموجات WiFi',
            job: 'نقل البتات (0 و 1)',
            attacks: [
              { name: 'Wiretapping', desc: 'التنصت الفيزيائي', damage: 'سرقة البيانات' }
            ]
          }
        ],

        code: {
          title: 'فحص الاتصال بطبقات مختلفة',
          code: `# Layer 3 - Ping test
ping google.com

# Layer 4 - TCP Port scan
nc -zv google.com 80

# Layer 7 - HTTP request
curl -I https://google.com`,
          explanation: `ping يختبر Layer 3 (IP)، nc يختبر Layer 4 (TCP)، curl يختبر Layer 7 (HTTP)`
        }
      }
    }
  ];

  const Section = ({ section, children }) => {
    const Icon = section.icon;
    const isExpanded = expandedSections[section.id] ?? true;
    const isCompleted = completedSections.includes(section.id);

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border-2 border-gray-100">
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
          <div className="flex items-center gap-3">
            {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
            {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </div>
        </button>

        {isExpanded && (
          <div className="p-6 border-t border-gray-100">
            {children}
            <button
              onClick={() => toggleComplete(section.id)}
              className={`mt-6 px-6 py-3 rounded-lg font-semibold transition-all ${
                isCompleted
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isCompleted ? '✓ مكتمل' : 'وضع علامة كمكتمل'}
            </button>
          </div>
        )}
      </div>
    );
  };

  const progress = (completedSections.length / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header - متطابق مع الموقع */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronRight className="w-8 h-8 rotate-180" />
            </Link>
            <Network className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">أساسيات الشبكات</h1>
              <p className="text-blue-100 text-sm mt-1">Networking Fundamentals</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">تقدمك</span>
              <span className="text-xl font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm mt-2 text-blue-100">
              {completedSections.length} من {sections.length} دروس مكتملة
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Section 1 */}
        <Section section={sections[0]}>
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {sections[0].content.intro}
            </p>

            {/* Animation */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-cyan-200">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                شاهد كيف تنتقل البيانات
              </h3>
              <div className="flex items-center justify-between py-6">
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-4 rounded-full ${animationStep >= 0 ? 'bg-cyan-500 scale-110' : 'bg-gray-400'} transition-all duration-500`}>
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-medium">جهازك</span>
                </div>
                
                <div className="flex-1 mx-4 h-1 bg-gray-300 relative overflow-hidden">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000"
                    style={{ width: '25%', left: animationStep === 1 ? '0%' : animationStep === 2 ? '37%' : animationStep === 3 ? '75%' : '-25%' }}
                  />
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-4 rounded-full ${animationStep >= 2 ? 'bg-purple-500 scale-110' : 'bg-gray-400'} transition-all duration-500`}>
                    <Wifi className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-medium">الراوتر</span>
                </div>
                
                <div className="flex-1 mx-4 h-1 bg-gray-300 relative overflow-hidden">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-1000"
                    style={{ width: '25%', left: animationStep === 3 ? '75%' : '-25%' }}
                  />
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-4 rounded-full ${animationStep >= 3 ? 'bg-green-500 scale-110' : 'bg-gray-400'} transition-all duration-500`}>
                    <Server className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-medium">السيرفر</span>
                </div>
              </div>
            </div>

            {/* Network Types */}
            <div>
              <h3 className="text-2xl font-bold mb-4">أنواع الشبكات</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {sections[0].content.types.map((type, idx) => (
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
            </div>

            {/* Attacks */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-6 h-6" />
                الهجمات الشائعة
              </h3>
              <div className="space-y-4">
                {sections[0].content.attacks.map((attack, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-lg text-red-600 mb-2">{attack.name}</h4>
                    <p className="text-gray-700 mb-2">{attack.description}</p>
                    <p className="text-sm text-red-600 font-semibold">{attack.damage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Code className="w-6 h-6 text-green-500" />
                {sections[0].content.code.title}
              </h3>
              <div className="bg-gray-900 p-4 rounded-lg mb-3">
                <pre className="text-sm text-green-400 overflow-x-auto">
                  {sections[0].content.code.code}
                </pre>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-gray-700">{sections[0].content.code.explanation}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2 - OSI */}
        <Section section={sections[1]}>
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {sections[1].content.intro}
            </p>

            {/* OSI Layers */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">الطبقات السبع لنموذج OSI</h3>
              <div className="space-y-4">
                {sections[1].content.layers.map((layer) => (
                  <div key={layer.number} className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-5">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{layer.emoji}</div>
                        <div>
                          <span className="text-2xl font-bold text-blue-600">Layer {layer.number}</span>
                          <h4 className="text-xl font-bold text-gray-800">{layer.name}</h4>
                          <p className="text-sm text-gray-600">{layer.nameAr}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-gray-700 mb-4">{layer.description}</p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <p className="font-bold text-blue-600 mb-2">الوظيفة:</p>
                        <p className="text-gray-700">{layer.job}</p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <p className="font-bold text-blue-600 mb-2">البروتوكولات:</p>
                        <div className="flex flex-wrap gap-2">
                          {layer.protocols.map((protocol, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium">
                              {protocol}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                        <p className="font-bold text-red-600 mb-3">الهجمات:</p>
                        <div className="space-y-2">
                          {layer.attacks.map((attack, idx) => (
                            <div key={idx} className="bg-white p-3 rounded">
                              <p className="font-bold text-red-600 text-sm">{attack.name}</p>
                              <p className="text-xs text-gray-600">{attack.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Terminal className="w-6 h-6 text-green-500" />
                {sections[1].content.code.title}
              </h3>
              <div className="bg-gray-900 p-4 rounded-lg mb-3">
                <pre className="text-sm text-green-400 overflow-x-auto">
                  {sections[1].content.code.code}
                </pre>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-gray-700">{sections[1].content.code.explanation}</p>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default NetworkingFundamentals;