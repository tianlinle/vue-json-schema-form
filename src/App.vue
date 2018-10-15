<template>
  <div class="m-3">
    <json-schema-form :schema="schema" v-model="value"/>
    <div class="btn btn-primary" @click="view">查看</div>
  </div>
</template>

<script>
import JsonSchemaForm from "./components/JsonSchemaForm.vue";

export default {
  components: { JsonSchemaForm },
  data() {
    return {
      value: { cards: [["1", "2"]], nick: "222" },
      schema: {
        type: "object",
        properties: {
          nick: {
            type: "string",
            title: "昵称",
            form: {
              component: "json-schema-form-textarea"
            }
          },
          sex: {
            type: "integer",
            title: "性别",
            anyOf: [
              {
                title: "男",
                const: 1
              },
              {
                title: "女",
                const: 0
              }
            ]
          },
          age: {
            type: "integer",
            title: "年龄"
          },
          groups: {
            type: "array",
            title: "分组",
            items: {
              type: "string",
              anyOf: [
                {
                  title: "超级管理员",
                  const: "root"
                },
                {
                  title: "普通",
                  const: "member"
                }
              ]
            }
          },
          isVip: {
            type: "boolean",
            title: "vip会员"
          },
          tags: {
            type: "array",
            title: "印象列表",
            items: {
              type: "string",
              title: "印象"
            },
            default: ["good", "yes"]
          },
          cards: {
            type: "array",
            title: "卡牌组合列表",
            items: {
              type: "array",
              title: "卡牌组合",
              items: {
                type: "string",
                title: "卡牌"
              }
            }
          },
          addresses: {
            type: "array",
            title: "收货地址列表",
            items: {
              type: "object",
              title: "收货地址",
              properties: {
                name: {
                  type: "string",
                  title: "收货人"
                },
                phone: {
                  type: "string",
                  title: "电话号码"
                },
                address: {
                  type: "string",
                  title: "地址"
                }
              }
            }
          }
        }
      }
    };
  },
  methods: {
    view() {
      console.log(JSON.parse(JSON.stringify(this.value)));
    }
  }
};
</script>
