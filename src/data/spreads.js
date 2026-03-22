export const SPREADS = [
  {
    category: { en: 'Classic Spreads', th: 'การทำนายแบบคลาสสิก' },
    items: [
      {
        id: 'one_card',
        name: { en: 'One Card', th: 'ไพ่ 1 ใบ' },
        description: { en: 'Universally useful for a quick answer', th: 'คำแนะนำประจำวันหรือคำถามสั้นๆ' },
        cardCount: 1,
        positions: {
          en: ['The Answer / Focus'],
          th: ['คำตอบ / สิ่งที่ต้องโฟกัส']
        }
      },
      {
        id: 'past_present_future',
        name: { en: 'Past, Present & Future', th: 'อดีต ปัจจุบัน อนาคต' },
        description: { en: 'Metaphors of time', th: 'ภาพรวมของสถานการณ์ตามเวลา' },
        cardCount: 3,
        positions: {
          en: ['Past', 'Present', 'Future'],
          th: ['อดีต', 'ปัจจุบัน', 'อนาคต']
        }
      }
    ]
  },
  {
    category: { en: 'Self Improvement', th: 'การพัฒนาตนเอง' },
    items: [
      {
        id: 'archetypes',
        name: { en: 'Archetypes of Character', th: 'สัญลักษณ์แห่งตัวตน' },
        description: { en: 'Uses majors to explore your psyche', th: 'สำรวจจิตใต้สำนึกและบทบาทในชีวิต' },
        cardCount: 3,
        positions: {
          en: ['Your Persona', 'Your Shadow', 'Your True Self'],
          th: ['ภาพลักษณ์ (Persona)', 'เงามืด (Shadow)', 'ตัวตนแท้จริง (Self)']
        }
      }
    ]
  },
  {
    category: { en: 'Miscellaneous', th: 'รูปแบบอื่นๆ' },
    items: [
      {
        id: 'comparing_choices',
        name: { en: 'Comparing Choices', th: 'เปรียบเทียบทางเลือก' },
        description: { en: 'Which choice is best?', th: 'ควรตัดสินใจเลือกทางไหนดี?' },
        cardCount: 5,
        positions: {
          en: ['Current Situation', 'Choice A Path', 'Choice B Path', 'Choice A Outcome', 'Choice B Outcome'],
          th: ['สถานการณ์ปัจจุบัน', 'เส้นทาง A', 'เส้นทาง B', 'ผลลัพธ์ A', 'ผลลัพธ์ B']
        }
      },
      {
        id: 'astrological',
        name: { en: 'The Astrological Spread', th: 'จักรราศี 12 เรือน' },
        description: { en: 'A description of the 12 areas of life', th: 'ทำนายภาพรวมชีวิตทั้ง 12 ด้าน' },
        cardCount: 12,
        positions: {
          en: [
            '1st House (Self)', '2nd House (Values/Money)', '3rd House (Mind/Comm)', 
            '4th House (Home/Roots)', '5th House (Creativity/Romance)', '6th House (Health/Work)',
            '7th House (Partnerships)', '8th House (Transformation)', '9th House (Beliefs/Travel)',
            '10th House (Career/Status)', '11th House (Community/Goals)', '12th House (Subconscious)'
          ],
          th: [
            'เรือนที่ 1 (ตัวตน)', 'เรือนที่ 2 (การเงิน)', 'เรือนที่ 3 (การสื่อสาร)',
            'เรือนที่ 4 (ครอบครัว/รากฐาน)', 'เรือนที่ 5 (ความคิดสร้างสรรค์/ความรัก)', 'เรือนที่ 6 (สุขภาพ/งานประจำ)',
            'เรือนที่ 7 (หุ้นส่วน/คู่ครอง)', 'เรือนที่ 8 (การเปลี่ยนแปลงพ้นผ่าน)', 'เรือนที่ 9 (ความเชื่อ/การเดินทาง)',
            'เรือนที่ 10 (อาชีพ/สถานะ)', 'เรือนที่ 11 (สังคม/เป้าหมาย)', 'เรือนที่ 12 (จิตใต้สำนึก/ความลับ)'
          ]
        }
      }
    ]
  },
  {
    category: { en: 'Feng Shui Spreads', th: 'การทำนายแบบฮวงจุ้ย' },
    items: [
      {
        id: 'spiritual_fengshui',
        name: { en: 'Spiritual Fengshui', th: 'ฮวงจุ้ยจิตวิญญาณ' },
        description: { en: 'Analyze energy direction (3x3 grid + summary)', th: 'วิเคราะห์ทิศทางพลังงานสถานที่ (9 ใบ + 1 ใบสรุป)' },
        cardCount: 10,
        positions: {
          en: [
            'South (Fame)', 'Southwest (Love)', 'West (Children/Creativity)',
            'Southeast (Wealth)', 'Center (Health/Balance)', 'Northwest (Helpful People)',
            'East (Family)', 'Northeast (Knowledge)', 'North (Career/Path)',
            'Summary / Outcome'
          ],
          th: [
            'ทิศใต้ (ชื่อเสียง/ความสำเร็จ)', 'ทิศตะวันตกเฉียงใต้ (ความรัก/คู่ครอง)', 'ทิศตะวันตก (สร้างสรรค์/บุตร)',
            'ทิศตะวันออกเฉียงใต้ (การเงิน)', 'จุดศูนย์กลาง (สุขภาพ/สมดุล)', 'ทิศตะวันตกเฉียงเหนือ (ผู้อุปถัมภ์/เดินทาง)',
            'ทิศตะวันออก (ครอบครัว/บ้าน)', 'ทิศตะวันออกเฉียงเหนือ (ความรู้/ปัญญา)', 'ทิศเหนือ (หน้าที่การงาน)',
            'ใบสรุป (แนวทางแก้ไข/ผลลัพธ์)'
          ]
        }
      }
    ]
  }
];
