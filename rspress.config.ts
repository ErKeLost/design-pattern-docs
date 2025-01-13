import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Design Pattern',
  icon: '/design-pattern2.jpg',
  logo: {
    light: '/design-pattern2.jpg',
    dark: '/design-pattern2.jpg',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/web-infra-dev/rspress',
      },
    ],
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '创建型模式',
        link: '/creational-patterns/',
      },
      {
        text: '结构型模式',
        link: '/structural-patterns/',
      },
      {
        text: '行为型模式',
        link: '/behavioral-patterns/',
      },
    ],
    // 配置侧边栏
    sidebar: {
      '/': [
        {
          text: '介绍',
          items: [
            {
              text: '介绍',
              link: '/',
            },
          ],
        },
        {
          text: '创建型模式',
          items: [
            {
              text: '概述',
              link: '/creational-patterns/',
            },
            {
              text: '单例模式',
              link: '/creational-patterns/singleton',
            },
            {
              text: '工厂方法模式',
              link: '/creational-patterns/factory-method',
            },
            {
              text: '抽象工厂模式',
              link: '/creational-patterns/abstract-factory',
            },
            {
              text: '生成器模式',
              link: '/creational-patterns/generator',
            },
            {
              text: '原型模式',
              link: '/creational-patterns/prototype',
            },
          ],
        },
        {
          text: '结构型模式',
          items: [
            {
              text: '概述',
              link: '/structural-patterns/',
            },
            {
              text: '适配器模式',
              link: '/structural-patterns/adapter',
            },
            {
              text: '桥接模式',
              link: '/structural-patterns/bridge',
            },
            {
              text: '组合模式',
              link: '/structural-patterns/composite',
            },
            {
              text: '装饰器模式',
              link: '/structural-patterns/decorator',
            },
            {
              text: '外观模式',
              link: '/structural-patterns/facade',
            },
            {
              text: '享元模式',
              link: '/structural-patterns/flyweight',
            },
            {
              text: '代理模式',
              link: '/structural-patterns/proxy',
            },
          ],
        },
        {
          text: '行为型模式',
          items: [
            {
              text: '概述',
              link: '/behavioral-patterns/',
            },
            {
              text: '责任链模式',
              link: '/behavioral-patterns/chain-of-responsibility',
            },
            {
              text: '命令模式',
              link: '/behavioral-patterns/command',
            },
            {
              text: '解释器模式',
              link: '/behavioral-patterns/interpreter',
            },
            {
              text: '迭代器模式',
              link: '/behavioral-patterns/iterator',
            },
            {
              text: '中介者模式',
              link: '/behavioral-patterns/mediator',
            },
            {
              text: '备忘录模式',
              link: '/behavioral-patterns/memento',
            },
            {
              text: '观察者模式',
              link: '/behavioral-patterns/observer',
            },
            {
              text: '状态模式',
              link: '/behavioral-patterns/state',
            },
            {
              text: '策略模式',
              link: '/behavioral-patterns/strategy',
            },
            {
              text: '模板方法模式',
              link: '/behavioral-patterns/template-method',
            },
            {
              text: '访问者模式',
              link: '/behavioral-patterns/visitor',
            },
          ],
        },
      ]
    },
  },
});
