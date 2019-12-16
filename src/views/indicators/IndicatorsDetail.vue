<template>
  <bg-card>
    <div class="indicator-detail-wrap">
      <div class="title">风控指标详情</div>
      <div class="con">
        <div class="indicator-item">
          <div class="indicator-title-text">产品编号 :</div>
          <span class="span">{{ currentRiskControlDetail.productId }}</span>
        </div>
        <div class="indicator-item">
          <div class="indicator-title-text">产品名称 :</div>
          <span class="span">{{ currentRiskControlDetail.productName }}</span>
        </div>
        <div class="indicator-item">
          <div class="indicator-title-text">仓位权重 :</div>
          <span class="span">{{ currentRiskControlDetail.positionWeight }}%</span>
        </div>
        <div class="indicator-items">
          <div>
            <div class="indicator-title-text">
              <span class="span">净值 :</span>
              <span class="span">最大持仓比例 :</span>
            </div>
          </div>
          <div v-for="(item, key) in currentRiskControlDetail.netValueList" :key="key">
            <div>
              <span v-if="key !== 0 && key !== currentRiskControlDetail.netValueList.length - 1" class="span">
                预警 — {{ item.minNav }} 至 {{ item.maxNav }}</span>
              <span v-if="key !== 0 && key !== currentRiskControlDetail.netValueList.length - 1" class="span">
                预警 — {{ item.holdingRate }}%</span>
            </div>
            <div v-if="key === currentRiskControlDetail.netValueList.length - 1">
              <span class="span">超规 — ≤{{ item.maxNav }}</span>
              <span class="span">超规 — {{ item.holdingRate }}%</span>
            </div>

          </div>
        </div>
        <div class="indicator-item">
          <div class="indicator-title-text">总敞口率 :</div>
          <span class="span">预警 — {{ currentRiskControlDetail.totalExposureRate1 }}%</span>
          <span class="span">超规 — {{ currentRiskControlDetail.totalExposureRate2 }}%</span>
        </div>
        <div class="indicator-item">
          <div class="indicator-title-text">总杠杆率 :</div>
          <span class="span">预警 — {{ currentRiskControlDetail.totalLeverageRatio1 }}</span>
          <span class="span">超规 — {{ currentRiskControlDetail.totalLeverageRatio2 }}</span>
        </div>
        <div class="indicator-item">
          <div class="indicator-title-text">保证金率 :</div>
          <span class="span">预警 — {{ currentRiskControlDetail.marginRate1 }}%</span>
          <span class="span">超规 — {{ currentRiskControlDetail.marginRate2 }}%</span>
        </div>
        <div class="indicator-item indicator-itemss">
          <div class="indicator-title-text">交易币种范围 :</div>
          <div>
            <div class="currencies">
              <checkbox
                v-for="(item,index) in currentRiskControlDetail.ownerCurrencyTypes"
                :key="index"
                class="currency"
                :label="item"
              />
            </div>
          </div>
        </div>
        <div class="indicator-item">
          <div class="indicator-title-text">年化收益率 :</div>
          <span class="span">预警 — {{ currentRiskControlDetail.annualizedRateOfReturn1 }}%</span>
          <span class="span">超规 — {{ currentRiskControlDetail.annualizedRateOfReturn2 }}%</span>
        </div>
        <div class="indicator-item">
          <div class="indicator-title-text">当日收益率 :</div>
          <span class="span">预警 — {{ currentRiskControlDetail.yieldOfTheDay1 }}%</span>
          <span class="span">超规 — {{ currentRiskControlDetail.yieldOfTheDay2 }}%</span>
        </div>
        <div class="indicator-item">
          <div class="indicator-title-text">当前回撤 :</div>
          <span class="span">预警 — {{ currentRiskControlDetail.maximumWithdrawalOnThatDay1 }}%</span>
          <span class="span">超规 — {{ currentRiskControlDetail.maximumWithdrawalOnThatDay2 }}%</span>
        </div>
        <div class="indicator-item">
          <div class="indicator-title-text">7日回撤 :</div>
          <span class="span">预警 — {{ currentRiskControlDetail.weekMaxDrawDownRate1 }}%</span>
          <span class="span">超规 — {{ currentRiskControlDetail.weekMaxDrawDownRate2 }}%</span>
        </div>
        <div class="indicator-item">
          <div class="indicator-title-text">累计盈亏值 :</div>
          <span class="span">预警 — {{ currentRiskControlDetail.accumulatedProfitAndLoss1 }}</span>
          <span class="span">超规 — {{ currentRiskControlDetail.accumulatedProfitAndLoss2 }}</span>
        </div>
      </div>
      <div class="buttons">
        <bg-button class="button" type="primary" @click="goList">返回</bg-button>
      </div>
    </div>
  </bg-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Button } from 'element-ui'
import BgCard from '../../components/card/BgCard.vue'
import Checkbox from './components/Checkbox.vue'

export default {
  name: 'IndicatorsDetail',
  components: {
    BgCard,
    Checkbox,
    'bg-button': Button
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapActions('risk/indicator', [
      'getRiskControlDetailById'
    ]),
    goList() {
      this.$router.push('/indicators/IndicatorsMaintenance')
    }
  },
  computed: {
    ...mapGetters('risk/indicator', [
      'currentRiskControlDetail'
    ])
  },
  mounted() {
    this.getRiskControlDetailById(this.$route.query.id || 1)
  }
}
</script>

<style lang="scss" scoped>
.indicator-detail-wrap {
  width: 98%;
  margin: 0 auto;
  height: 100%;
  border-radius: 5px;
  background: #ffffff;

  .title {
    font-size: 18px;
    font-weight: bolder;
    line-height: 50px;
    height: 50px;
    padding-left: 15px;
  }

  .con {
    width: 800px;
    margin: 0 auto;
    font-size: 16px;

    .indicator-item {
      padding: 13px 20px;
      display: flex;
      flex-wrap: wrap;

      > div:nth-child(1) {
        width: 200px;
        text-align: right;
        margin-right: 20px;
      }

      > .span:nth-child(2),
       .span:nth-child(3) {
        width: 150px;
      }

      > div:nth-child(2) {
        flex: 1;
        display: flex;

        .currencies {
          display: flex;
          flex-wrap: wrap;

          .currency{
            margin-bottom: 10px;
          }
        }
      }
    }

    .indicator-items {
      padding: 0 150px 0 180px;

      > div {
        flex: 1;

        > div{
          display: flex;

          >.span {
            width: 250px;
            margin: 10px 0;
          }
        }
      }
    }

    .indicator-itemss{
      padding-bottom: 0;
    }

    .indicator-title-text {
      color: #888888;
    }
  }

  .buttons {
    text-align: center;
    padding: 30px;

    .button {
      width: 120px;
      margin: 0 20px;
    }
  }
}
</style>
