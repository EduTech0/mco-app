<template>
  <q-dialog
    :model-value="dialogsnk"
    @update:model-value="$emit('update:dialogsnk', $event)"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="bg-primary q-py-sm text-white shadow">
        <q-btn
          dense
          flat
          icon="arrow_back"
          v-close-popup
          class="absolute-left"
        />
        <div class="text-subtitle1 text-center">Syarat dan Ketentuan</div>
      </q-card-section>

      <q-card-section class="q-pt-lg">
        <br />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>Selamat datang di MCO Lectzz!</p>
        <p>
          Syarat dan ketentuan berikut menjelaskan peraturan dan ketentuan
          penggunaan Website MCO Lectzz dengan alamat https://mcolectzz.com.
        </p>
        <p class="q-pb-lg">
          Dengan mengakses website ini, kami menganggap Anda telah menyetujui
          syarat dan ketentuan ini. Jangan lanjutkan penggunaan MCO Lectzz jika
          Anda menolak untuk menyetujui semua syarat dan ketentuan yang
          tercantum di halaman ini.
        </p>
        <p>Cookie :</p>
        <p>
          Website ini menggunakan cookie untuk mempersonalisasi pengalaman
          online Anda. Dengan mengakses MCO Lectzz, Anda menyetujui penggunaan
          cookie yang diperlukan.
        </p>
        <p>
          Cookie merupakan file teks yang ditempatkan pada hard disk Anda oleh
          server halaman web. Cookie tidak dapat digunakan untuk menjalankan
          program atau mengirimkan virus ke komputer Anda. Cookie yang diberikan
          telah disesuaikan untuk Anda dan hanya dapat dibaca oleh web server
          pada domain yang mengirimkan cookie tersebut kepada Anda.
        </p>
        <p class="q-pb-lg">
          Kami dapat menggunakan cookie untuk mengumpulkan, menyimpan, dan
          melacak informasi untuk keperluan statistik dan pemasaran untuk
          mengoperasikan website kami. Ada beberapa Cookie wajib yang diperlukan
          untuk pengoperasian website kami. Cookie ini tidak memerlukan
          persetujuan Anda karena akan selalu aktif. Perlu diketahui bahwa
          dengan menyetujui Cookie wajib, Anda juga menyetujui Cookie pihak
          ketiga, yang mungkin digunakan melalui layanan yang disediakan oleh
          pihak ketiga jika Anda menggunakan layanan tersebut di website kami,
          misalnya, jendela tampilan video yang disediakan oleh pihak ketiga dan
          terintegrasi dengan website kami.
        </p>
        <p>Lisensi:</p>
        <p class="q-pb-lg">
          Kecuali dinyatakan lain, MCO Lectzz dan/atau pemberi lisensinya
          memiliki hak kekayaan intelektual atas semua materi di MCO Lectzz.
          Semua hak kekayaan intelektual dilindungi undang-undang. Anda dapat
          mengaksesnya dari MCO Lectzz untuk penggunaan pribadi Anda sendiri
          dengan batasan yang diatur dalam syarat dan ketentuan ini.
        </p>
        <q-list>Anda dilarang untuk:</q-list>
        <q-item>Menyalin atau menerbitkan ulang materi dari MCO Lectzz</q-item>
        <q-item
          >Menjual, menyewakan, atau mensublisensikan materi dari MCO
          Lectzz</q-item
        >
        <q-item
          >Memproduksi ulang, menggandakan, atau menyalin materi dari MCO
          Lectzz</q-item
        >
        <q-item>Mendistribusikan ulang konten dari MCO Lectzz</q-item>
        <p class="q-pb-lg">
          Perjanjian ini akan mulai berlaku pada tanggal perjanjian ini.
        </p>
        <p>
          Beberapa bagian website ini menawarkan kesempatan bagi pengguna untuk
          memposting serta bertukar pendapat dan informasi di area website
          tertentu. MCO Lectzz tidak akan memfilter, mengedit, memublikasikan,
          atau meninjau Komentar di hadapan pengguna di website. Komentar tidak
          mencerminkan pandangan dan pendapat MCO Lectzz, agennya, dan/atau
          afiliasinya. Komentar mencerminkan pandangan dan pendapat individu
          yang memposting pandangan dan pendapatnya. Selama diizinkan oleh
          undang-undang yang berlaku, MCO Lectzz tidak akan bertanggung jawab
          atas Komentar atau kewajiban, kerugian, atau pengeluaran yang
          disebabkan dan/atau ditanggung sebagai akibat dari penggunaan dan/atau
          penempatan dan/atau penayangan Komentar di website ini.
        </p>
        <p class="q-pb-lg">
          MCO Lectzz berhak memantau semua Komentar dan menghapus Komentar apa
          pun yang dianggap tidak pantas, menyinggung, atau menyebabkan
          pelanggaran terhadap Syarat dan Ketentuan ini.
        </p>
        <q-list>Anda menjamin dan menyatakan bahwa:</q-list>
        <q-item
          >Anda berhak memposting Komentar di website kami serta memiliki semua
          lisensi dan persetujuan yang diperlukan untuk melakukannya;</q-item
        >
        <q-item
          >Komentar tidak melanggar hak kekayaan intelektual apa pun, termasuk
          tetapi tidak terbatas pada, hak cipta, paten, atau merek dagang pihak
          ketiga mana pun;</q-item
        >
        <q-item
          >Komentar tidak mengandung materi yang bersifat memfitnah, mencemarkan
          nama baik, menyinggung, tidak senonoh, atau melanggar hukum, yang
          merupakan pelanggaran privasi.</q-item
        >
        <q-item
          >Komentar tidak akan digunakan untuk membujuk atau mempromosikan
          bisnis atau kebiasaan atau memperkenalkan kegiatan komersial atau
          kegiatan yang melanggar hukum.</q-item
        >
        <p class="q-pb-lg">
          Dengan ini Anda memberikan lisensi non-eksklusif kepada MCO Lectzz
          untuk menggunakan, memproduksi ulang, mengedit, dan mengizinkan orang
          lain untuk menggunakan, memproduksi ulang, dan mengedit Komentar Anda
          dalam segala bentuk, format, atau media.
        </p>
        <p>Membuat hyperlink yang mengarah ke Konten kami:</p>
        <q-list
          >Organisasi berikut dapat membuat tautan menuju Website kami tanpa
          persetujuan tertulis sebelumnya:</q-list
        >
        <q-item>Lembaga pemerintah;</q-item>
        <q-item>Mesin pencari;</q-item>
        <q-item>Kantor berita;</q-item>
        <q-item>
          Distributor direktori online dapat membuat tautan menuju Website kami
          dengan cara yang sama seperti membuat tautan ke Website bisnis
          terdaftar lainnya; dan
        </q-item>
        <q-item
          >Bisnis Terakreditasi di Seluruh Sistem kecuall meminta organisasi
          nirlaba, pusat perbelanjaan amal, dan grup penggalangan dana amal yang
          mungkin tidak membuat hyperlink menuju Website kami.</q-item
        >
        <p class="q-pb-lg">
          Organisasi-organisasi ini dapat menautkan ke halaman beranda, ke
          publikasi, atau ke informasi Website kami lainnya selama tautan
          tersebut: (a) tidak menipu dengan cara apa pun; (b) tidak menyiratkan
          secara keliru adanya hubungan sponsor, rekomendasi, atau persetujuan
          dari pihak yang menautkan beserta produk dan/atau layanannya; serta
          (c) sesuai dengan konteks website pihak yang menautkan.
        </p>
        <q-list
          >Kami dapat mempertimbangkan dan menyetujui permintaan penautan lain
          dari jenis organisasi berikut:</q-list
        >
        <q-item
          >sumber informasi bisnis dan/atau konsumen yang sudah umum
          dikenal;</q-item
        >
        <q-item>website komunitas dot.com;</q-item>
        <q-item>asosiasi atau kelompok lain yang mewakili badan amal;</q-item>
        <q-item>distributor direktori online;</q-item>
        <q-item>portal internet;</q-item>
        <q-item>firma akuntansi, hukum, dan konsultan; dan</q-item>
        <q-item>lembaga pendidikan dan asosiasi dagang.</q-item>
        <p>
          Kami akan menyetujui permintaan penautan dari organisasi-organisasi
          tersebut jika kami memutuskan bahwa: (a) tautan tersebut tidak akan
          membuat kami terlihat merugikan kami sendiri atau bisnis terakreditasi
          kami; (b) organisasi tidak memiliki catatan negatif apa pun dengan
          kami; (c) keuntungan bagi kami dari keberadaan hyperlink
          mengkompensasi tidak adanya MCO Lectzz, dan (d) tautan tersebut dalam
          konteks informasi sumber daya umum.
        </p>
        <p>
          Organisasi-organisasi ini dapat menautkan ke halaman beranda kami
          selama tautan tersebut: (a) tidak menipu dengan cara apa pun; (b)
          tidak menyiratkan secara keliru adanya hubungan sponsor, rekomendasi,
          atau persetujuan dari pihak yang menautkan beserta produk dan/atau
          layanannya; dan (c) sesuai dengan konteks website pihak yang
          menautkan.
        </p>
        <p>
          Jika Anda merupakan salah satu organisasi yang tercantum dalam
          paragraf 2 di atas dan tertarik untuk membuat tautan ke website kami,
          Anda harus memberitahu kami dengan mengirimkan email ke MCO Lectzz.
          Harap cantumkan nama Anda, nama organisasi Anda, informasi kontak dan
          URL website Anda, daftar URL apa pun yang akan memuat tautan ke
          Website kami, serta daftar URL di website kami yang ingin Anda
          tautkan. Silakan tunggu tanggapan dari kami selama 2-3 minggu.
        </p>
        <q-list
          >Organisasi yang telah disetujui dapat membuat hyperlink menuju
          Website kami seperti berikut:</q-list
        >
        <q-item>Dengan menggunakan nama perusahaan kami; atau</q-item>
        <q-item
          >Dengan menggunakan Uniform Resource Locator yang ditautkan;
          atau</q-item
        >
        <q-item
          >Dengan menggunakan deskripsi lain dari Website kami yang ditautkan
          yang masuk akal dalam konteks dan format konten di website pihak yang
          menautkan.</q-item
        >
        <p class="q-pb-lg">
          Tidak ada penggunaan logo MCO Lectzz atau karya seni lainnya yang
          diizinkan untuk menautkan perjanjian lisensi merek dagang.
        </p>
        <p>Tanggung jawab atas Konten:</p>
        <p class="q-pb-lg">
          Kami tidak akan bertanggung jawab atas konten yang muncul di Website
          Anda. Anda setuju untuk melindungi dan membela kami terhadap semua
          klaim yang diajukan atas Website Anda. Tidak ada tautan yang muncul di
          Website mana pun yang dapat dianggap sebagai memfitnah, cabul, atau
          kriminal, atau yang menyalahi, atau melanggar, atau mendukung
          pelanggaran lain terhadap hak pihak ketiga.
        </p>
        <p>Pernyataan Kepemilikan Hak:</p>
        <p class="q-pb-lg">
          Kami berhak meminta Anda menghapus semua tautan atau tautan tertentu
          yang menuju ke Website kami. Anda setuju untuk segera menghapus semua
          tautan ke Website kami sesuai permintaan. Kami juga berhak mengubah
          syarat ketentuan ini dan kebijakan penautannya kapan saja. Dengan
          terus menautkan ke Website kami, Anda setuju untuk terikat dan
          mematuhi syarat dan ketentuan penautan ini.
        </p>
        <p>Penghapusan tautan dari website kami:</p>
        <p>
          Jika Anda menemukan tautan di Website kami yang bersifat menyinggung
          karena alasan apa pun, Anda bebas menghubungi dan memberi tahu kami
          kapan saja. Kami akan mempertimbangkan permintaan untuk menghapus
          tautan, tetapi kami tidak berkewajiban untuk menanggapi Anda secara
          langsung.
        </p>
        <p class="q-pb-lg">
          Kami tidak memastikan bahwa informasi di website ini benar. Kami tidak
          menjamin kelengkapan atau keakuratannya, dan kami juga tidak berjanji
          untuk memastikan bahwa website tetap tersedia atau materi di website
          selalu diperbarui.
        </p>
        <p>Penolakan:</p>
        <q-list
          >Sejauh diizinkan oleh undang-undang yang berlaku, kami mengecualikan
          semua representasi, jaminan, dan ketentuan yang berkaitan dengan
          website kami dan penggunaan website ini. Tidak ada bagian dari
          penolakan ini yang akan:</q-list
        >
        <q-item
          >membatasi atau mengecualikan tanggung jawab kami atau Anda terhadap
          kematian atau cedera pribadi:</q-item
        >
        <q-item
          >membatasi atau mengecualikan tanggung jawab kami atau Anda terhadap
          penipuan atau pemberian keterangan yang tidak benar;</q-item
        >
        <q-item
          >membatasi tanggung jawab kami atau Anda dengan cara apa pun yang
          tidak diizinkan oleh undang-undang yang berlaku; atau</q-item
        >
        <q-item
          >mengecualikan tanggung jawab kami atau Anda yang tidak dapat
          dikecualikan berdasarkan undang-undang yang berlaku.</q-item
        >
        <p>
          Batasan dan pengecualian tanggung jawab yang diatur dalam Bagian ini
          dan bagian lain dalam penolakan ini: (a) tunduk pada paragraf
          sebelumnya; dan (b) mengatur semua kewajiban yang timbul di bawah
          penolakan, termasuk kewajiban yang timbul dalam kontrak, dalam
          gugatan, dan untuk pelanggaran kewajiban hukum.
        </p>
        <p>
          Selama website dan informasi serta layanan di website disediakan
          secara gratis, kami tidak akan bertanggung jawab atas kerugian atau
          kerusakan apa pun.
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "SnKPage",

  props: {
    dialogsnk: Boolean,
    maximizedToggle: Boolean,
  },

  setup(props, { emit }) {
    const internalDialogsnk = computed({
      get: () => props.dialogsnk,
      set: (value) => emit("update:dialogsnk", value),
    });

    return {
      internalDialogsnk,
    };
  },
};
</script>

<style scoped>
.shadow {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: -2px 2px 15px black;
}
</style>
