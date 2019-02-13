import { createLocalVue, mount } from '@vue/test-utils';
import ModalNewBudget from '@/components/Modals/NewBudget.vue';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import vuexStore from '@/store';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('Modals/NewBudget.vue', () => {
	let store: any;

	beforeEach(() => {
		store = vuexStore;
	});

	it('Add Budget to Vuex Store', () => {
		// @ts-ignore
		const wrapper = mount(ModalNewBudget, {
			store,
			localVue,
			propsData: {
				name: ''
			}
		});

		// @ts-ignore
		wrapper.vm.name = 'Testing';

		// @ts-ignore
		wrapper.vm.addBudget();

		expect(
			wrapper.vm.$store.getters['Budgets/getBudgetNames'].length
		).toBe(1);

		expect(
			wrapper.vm.$store.getters['Budgets/getBudgetNames'][0].name
		).toBe('Testing');

		// @ts-ignore
		wrapper.vm.name = 'Testing 2';

		// @ts-ignore
		wrapper.vm.addBudget();

		expect(
			wrapper.vm.$store.getters['Budgets/getBudgetNames'].length
		).toBe(2);

		expect(
			wrapper.vm.$store.getters['Budgets/getBudgetNames'][1].name
		).toBe('Testing 2');
	});

	it('Add Budget through Modal', () => {
		// @ts-ignore
		const wrapper = mount(ModalNewBudget, {
			store,
			localVue,
			propsData: {
				name: ''
			}
		});
		// @ts-ignore
		wrapper.vm.$refs.AddNewBudget.show();

		const input = wrapper.find('.budget-name');
		input.setValue('Testing 3');

		// @ts-ignore
		expect(wrapper.vm.name).toBe('Testing 3');

		const button = wrapper.find('.btn-primary');
		button.trigger('click');

		expect(
			wrapper.vm.$store.getters['Budgets/getBudgetNames'].length
		).toBe(3);

		expect(
			wrapper.vm.$store.getters['Budgets/getBudgetNames'][2].name
		).toBe('Testing 3');
	});
});
