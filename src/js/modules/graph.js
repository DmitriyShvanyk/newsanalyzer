export default class Graph {
  constructor(container) {
    this.container = container;
    this.render();
  }
  render(month = 'Октябрь') {

    const fragmentCard = document.createDocumentFragment();

    const graphInner = document.createElement('div');
    graphInner.classList.add('graph__inner');

    const graph = `      
      <div class="graph__head">
        <div class="graph__columns">
          <div class="graph__column">
            <div class="graph__date-month">
              Дата <span class="graph__span">${month}</span>
            </div>
          </div>
          <div class="graph__column">
            <div class="graph__count">Кол-во упоминаний</div>
          </div>
        </div>
      </div>
      <div class="graph__scale">
        <span class="graph__scale-item">0</span>
        <span class="graph__scale-item">25</span>
        <span class="graph__scale-item">50</span>
        <span class="graph__scale-item">75</span>
        <span class="graph__scale-item">100</span>
      </div>
      <div class="graph__body">
        <div class="graph__columns graph__columns--center">
          <div class="graph__column">
            <div class="graph__date">19, пн</div>
          </div>
          <div class="graph__column">
            <div class="progress">
              <progress class="progress__bar" value="0" max="100"></progress>
              <span class="progress__count">0</span>
            </div>
          </div>
        </div>
        <div class="graph__columns graph__columns--center">
          <div class="graph__column">
            <div class="graph__date">20, вт</div>
          </div>
          <div class="graph__column">
            <div class="progress">
              <progress class="progress__bar" value="18" max="100"></progress>
              <span class="progress__count">18</span>
            </div>
          </div>
        </div>
        <div class="graph__columns graph__columns--center">
          <div class="graph__column">
            <div class="graph__date">21, ср</div>
          </div>
          <div class="graph__column">
            <div class="progress">
              <progress class="progress__bar" value="11" max="100"></progress>
              <span class="progress__count">11</span>
            </div>
          </div>
        </div>
        <div class="graph__columns graph__columns--center">
          <div class="graph__column">
            <div class="graph__date">22, чт</div>
          </div>
          <div class="graph__column">
            <div class="progress">
              <progress class="progress__bar" value="39" max="100"></progress>
              <span class="progress__count">39</span>
            </div>
          </div>
        </div>
        <div class="graph__columns graph__columns--center">
          <div class="graph__column">
            <div class="graph__date">23, пт</div>
          </div>
          <div class="graph__column">
            <div class="progress">
              <progress class="progress__bar" value="45" max="100"></progress>
              <span class="progress__count">45</span>
            </div>
          </div>
        </div>
        <div class="graph__columns graph__columns--center">
          <div class="graph__column">
            <div class="graph__date">24, сб</div>
          </div>
          <div class="graph__column">
            <div class="progress">
              <progress class="progress__bar" value="73" max="100"></progress>
              <span class="progress__count">73</span>
            </div>
          </div>
        </div>
        <div class="graph__columns graph__columns--center">
          <div class="graph__column">
            <div class="graph__date">25, вс</div>
          </div>
          <div class="graph__column">
            <div class="progress">
              <progress class="progress__bar" value="34" max="100"></progress>
              <span class="progress__count">34</span>
            </div>
          </div>
        </div>
      </div>
      <div class="graph__scale">
        <span class="graph__scale-item">0</span>
        <span class="graph__scale-item">25</span>
        <span class="graph__scale-item">50</span>
        <span class="graph__scale-item">75</span>
        <span class="graph__scale-item">100</span>
      </div>
    `;

    graphInner.innerHTML = graph;

    return graphInner

    /*const fragmentCard = document.createDocumentFragment();

    const graphHead = document.createElement('div');
    graphHead.classList.add('graph__head');

    const graphColumns = document.createElement('div');
    graphColumns.classList.add('graph__columns');

    const graphColumn = document.createElement('div');
    graphColumn.classList.add('graph__column');

    const graphDateMonth = document.createElement('div');
    graphDateMonth.classList.add('graph__date-month');
    graphDateMonth.textContent = 'Дата';

    const graphSpan = document.createElement('span');
    graphSpan.classList.add('graph__span');
    graphSpan.textContent = month;

    const graphCount = document.createElement('span');
    graphCount.classList.add('graph__span');
    graphCount.textContent = 'Кол-во упоминаний';

    const graphColumn2 = document.importNode(graphColumn, true);


    const graphScale = document.createElement('div');
    graphScale.classList.add('graph__scale');


    for (let i = 0; i < 5; i++) {
      const graphScaleItem = document.createElement('span');
      graphScaleItem.classList.add(`graph__scale-item-${i+1}`);
      graphScaleItem.textContent = `${i * 25}`;
      graphScale.appendChild(graphScaleItem);
    }

    const graphBody = document.createElement('div');
    graphBody.classList.add('graph__body');

    for (let i = 0; i < 7; i++) {
      const graphBodyColumns = document.createElement('div');
      graphBodyColumns.classList.add('graph__columns', 'graph__columns--center');

      graphBody.appendChild(graphBodyColumns);
    }


    graphColumns.appendChild(graphColumn);

    graphColumn.appendChild(graphDateMonth);
    graphDateMonth.appendChild(graphSpan);


    graphColumns.appendChild(graphColumn2);
    graphColumn2.appendChild(graphCount);


    graphHead.appendChild(graphColumns);
    

    this.container.appendChild(graphHead);
    this.container.appendChild(graphScale);
    this.container.appendChild(graphBody);*/




  }

}