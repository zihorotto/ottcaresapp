import { mount } from '@vue/test-utils';
import AnimatedBg from '@/components/AnimatedBg.vue';

describe('AnimatedBg', () => {
  it('renders slot content', () => {
    const wrapper = mount(AnimatedBg, {
      slots: {
        default: '<div class="test-slot">Hello</div>',
      },
    });
    expect(wrapper.html()).toContain('Hello');
  });
});
