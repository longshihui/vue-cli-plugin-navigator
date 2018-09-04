<template>
  <div id="app">
    <section class="section">
      <div id="logo"></div>
    </section>
   <section class="section">
     <h1 class="h1">
       Vue Pages Navigator
     </h1>
   </section>
    <section class="section">
      <v-input v-model="userInput" placeholder="search your page title..." center/>
    </section>
   <section class="section">
     <v-table :data="filterPages" @row-click="rowClickHandler">
       <v-table-col label="title" prop="title" />
       <v-table-col label="type" prop="type" default="none" />
       <v-table-col label="description" prop="description" default="none" />
     </v-table>
   </section>
   <section class="section">
      Note: click any table row will open the page
   </section>
    <footer class="footer">
      @ create by vue-cli-plugin-navigator
    </footer>
  </div>
</template>

<script lang="ts">
/* eslint-disable prefer-destructuring */
import Vue from 'vue';
import VInput from './components/v-input';
import { VTable, VTableCol } from './components/v-table';
import getConfig from '../utils/getConfig';

export default Vue.extend({
  name: 'app',
  components: {
    VInput,
    VTable,
    VTableCol
  },
  data() {
    return {
      userInput: '',
      pages: getConfig(),
    };
  },
  computed: {
      filterPages(): PageConfig[] {
          return this.pages.filter((config: PageConfig) => {
              return new RegExp(this.userInput, 'ig').test(config.title);
          });
      }
  },
    methods: {
        rowClickHandler(row: PageConfig) {
            location.href = row.path;
        }
    },
});
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: sans-serif;
  box-sizing: border-box;
  color: #2c3e50;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
  min-width: 700px;
  max-width: 1024px;
}

.section {
  margin: 20px 0;
}

.h1 {
  text-align: center;
}

#logo {
  margin: 0 auto;
  width: 150px;
  height: 150px;
  background: url("data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAABU1BMVEUAAABBuIM1SV5BuINBuINA
sIFBuINBuINBuINAsoE2TmBBuINBuINBuINBuINBuINBuINBuINBuINBuINBuINBuoRBuINBuINB
uINBuINApn5AroBBuINBuINBuINBuINBuINBuIM8d3BBuINBuIM4XGVBuIM5ZmpBuINBuINBuIM8
enI2UWE3VGM3VWNBuINBuIM3V2RBuIM4WmQ5YmhBuIM5Y2k6amtBuINBuIM6bm07cG47b207dG9B
uINBuIMzO1k6Z2o6aGpBuINBuIM1SV5Bt4NDyok0Qlw0QFtCxogzOFk1R10zNldDzIk1Rl00RFwy
NVczPVozO1lCw4dBvIRBvoVBv4VCyIhCwYZBuoM1S187gHEzN1dAqX8/nns+kXc9i3U7eW85bms5
Z2k/o30+mHk4YWc4XGY3V2Q3UmJAroE8hXM6c21Bs4JBsYEzNFfbZAU+AAAARHRSTlMAu7v7IA7y
5sQG/typi3pcQhT27cy9mmoxKAkDoZKDVEk7KhnRv7aSY083G/Xr4+DY2NTLsq+hd3RwZVVJOi2z
u4WBsmbv4tkAAAcESURBVHja7NdZT+JgFMbx44aC+wIqxsQQkShqYjSYuCRq3rcLLW0pmwqI+4LL
97+cGcfMKBbOE1Pu+rsmQHPSk/OnQCAQCAQCgUCAFYv2AKLR5FEvL0GES/TyjpJR7P/FKCYg2Vpd
spwMES7jSFa9lhWQGNGwACiV8lOBfxCZIFhC8g9SeCpXFAEYJqIJgVDU+4ItOfo2wbZ1ybGNe1UR
iAn6rUcgStnbuuSYzj6B9h1Tcuq32ZJA9NAf/dhIsheaJjnaBoE2gC/TLrLYQPrp3aiAqNd5ydJO
CHKiSVb+WhWQUforHIJGcqZUXf5BImkCpCP8g7gR5QwaSChMH8YFQrGucpKl7xBgR5es3JWlCMQ4
/bMsEOXioyE5tnlIrEPTlhzj8awsEMv03xq4ghsFhx/JFrG2+IE4hQa4etfokxGBOFdvcpJjanvE
2NNMycndqOcCMUKfTfZhK/jZ1iVHWw9TR+F1jZ+r/Yyt3r5J+mJMQKwasIL1FHWU0oHVW7MEZIxa
DGIruNR0JceppqmDdNWRHLdZwlbvILVaBd/3S8PkR5KkDpL8QEzjEnzTV+mbIfDkejAkx7QPqK0D
25Qc46FYEogh+m4eG8npnQus4E1qaxNYve7dKTaQefIAJpb6mgdW8C61sQus3vyriuaUl4EpaCTF
N6kDJ9cAeRqIAKtXvhWhgUy1+ZFZAbFekJMrQ54yyJH1YgnILHmCq7eCVe/P+7YC9603vHoNtHq7
37feVnyt3i737Qp58796F6jFgu996w2vXguq3mNqcQz1rYX2bSfhaezkEhGgeqvp1iPLx76dZk5s
sHpVrHp/0rcq2reMma5UL963RaxvZ4gzB55cDRevXrxv3QZ4ZM0Rw+/q7VrfMnyv3jh9iPvctwz/
q7dLfcvCq7dSahaA6k3QuwTQt4VmqQL2LWbJ3+r1v2+XCOB/9eJ9m0X7FoRXrw7cTpvvfQt8UMf7
Frboa/VifZtD+3aRcPEQWL1VpHqJkL6tgn0bihMIr14Fq95UCutbBe9b3C/mzV41gSgKg6eI4AtY
7cZFTGGnCII2psheE8HF+FOYNWIgFsHGvH+VLkUI7nd3TuG8gSzIHc58A+3JpVjvYr9fCH4rHhEG
FkfH8da7qP4dy43qtx2L5ClXKHenIjhQnHZlrvBosXQdrdfRb7sWTVu3Xsy36rdtiydxs17Bb3PR
bxOrQaY+uQ4BcvgQ/3ozq4BZb8WTS3hkMb91tV4A8FuV1MN6/fw2tbo0NOvdXq5Yr+K3W81vG1ab
MbZeR78dG6Av5nVXrLfSb8VIrm8K3HqXoRZL5rc6LXZo8DsitIxxh6zX0W/vDHIP8joQyQG/hdY7
+8d6Bb+dyX6L6eU4r+ORXM8cGGpPrrevTYhko0ZyQ9Ph1nv8Y72C3x5j/JYzEq33s4h9ZIl+O7Io
uPW+vtyM3+rWy59cq/fnOL/lJGJeV57XEX57LsVILjE3MnBowEeEzBxpAuuFfts0T6biJ/nN64RI
TvwgU3MlVQ8NRVDQjwipAUBedwnzIDAPFxDJISZqXrcKAis1kpuYM2BUxkZgHJ7X+UdyHDAqwyMw
Ds/reCTnDBiVsRGYM76jsvVeH4E5A0ZlbATmDBiVkUjuwZyhozI+AuPwvI5Hchye1/FIjsPzOhzJ
ucNHZXwExoGjMj4C4/C8jkdy/vBRGR+BcfiojI/AOHxUxkdgHDoqAyMwd/iojI/AONx6b8Zvf9q3
m5UEgyiM4yc0LPyksg8wRYywNooQ2CY3A21sGYo77/8muoHjO69zZpjnifndxZ9zHuuozDgC02Wp
Xpi+tY7KrCMwu7ijsvpPcteSkH1U9nP8zt631lGZYQRmkOK9LsmTXI7qhelbc/XC9K21enH61jYq
225/dyB9a3qv2x+P+/RPcvbq9dvtHEzfmqr3cADqW9N7XfInuXjvdXb2J7n01QvWt7qli2QpeU1d
JFPJbOOi2EhuMxfFTLIbuwjGkp9vVFZzBAZg4swmAqGqekH79vzqRe1b3ciZjASFZ1TmH4HBWDuD
tQBZuGALQaJXL3bf6oYu0FCwaIcGvCNCHc98fXuqevn6Vjd3AeYCaOXOthJEU8K+DRiVaT4E04yw
b3Vjvr71j8r8WhB9q5sQ9m3FoQH9iGAYlWm+BNqIr29Pv9chPcklH5V9Crw21pNcuAHYk1zSUdmF
MGgS9q2ui/UkZxmVeUdgJPpgT3KJRmUvwuO9egRGpIP1JGd5r8N6kgvXA3uSC9fCepKLPip7EzpX
fH2rewJ7kos6KrsXRpc3fH2rewB7kgvX5utb3YCwb2uMyl6FV5Owb3Vdvr71jcpuafpW1yfsW90d
1pNcuEewJ7lwHb6+PVW9fH2r6xH2ra7RkP9hDvk6UxRFURRFURS0/gD8CBvXYvEa7AAAAABJRU5E
rkJggg==");
  background-size: cover;
}

.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px 0;
  width: 100%;
  text-align: center;
}

.link {
    color: #e83030;
    text-decoration: none;
}
</style>
