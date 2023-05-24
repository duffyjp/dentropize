/**
 * = Dentropize
 *
 * Sort HTML tables by clicking the column TH and nothing else.
 * https://github.com/duffyjp/dentropize
 *
 * Please see README.md for details.
 *
 * Based on sortable v2.1.3
 *
 * https://www.npmjs.com/package/sortable-tablesort
 * https://github.com/tofsjonas/sortable
 *
 */


// Loop through each sortable table and add a click event listener
function dentropize() {
  document.querySelectorAll('table.sortable').forEach(table => {
    table.addEventListener('click', e => {
      try {
        //console.log("table click: " + new Date().toLocaleString());

        const th = e.target.closest('th');
        if (!th) return; // exit early if clicked element is not a <th>

        const descending_th_class = 'dir-d';
        const ascending_th_class = 'dir-u';

        function reClassify(element, dir) {
          element.classList.remove(descending_th_class, ascending_th_class);
          dir ? element.classList.add(dir) : null;
        }

        function getValue(element) {
          const value = element.dataset.sort ?? element.textContent;
          return value.trim();
        }

        let column_index;
        let nodes = [...th.closest('tr').cells];
        let tiebreaker = parseInt(th.dataset.sortTbr);

        nodes.forEach((node, i) => {
          if (node === th) {
            column_index = parseInt(th.dataset.sortCol) || i;
          } else {
            reClassify(node, '');
          }
        });

        let dir = descending_th_class;
        // Check if we're sorting ascending or descending
        if (th.classList.contains(descending_th_class) || !th.classList.contains(ascending_th_class)) {
          dir = ascending_th_class;
        }
        // Update the `th` class accordingly
        reClassify(th, dir);
        const reverse = dir === ascending_th_class;

        // Compare two cells.
        // The tests for empty strings ensures those rows are always last.
        const compare = (a, b, index) => {
          let x = getValue((reverse ? a : b).cells[index]);
          let y = getValue((reverse ? b : a).cells[index]);

          if (x === '' && y === '') {
            return 0;
          } else if (x === '') {
            return reverse ? 1 : -1;
          } else if (y === '') {
            return reverse ? -1 : 1;
          } else {

            // If the values parse as Numbers
            let number = Number(x.replace(/[$¥£,]/g, '')) - Number(y.replace(/[$¥£,]/g, ''));
            if (!isNaN(number)) return number;

            // If the values parse as Date or Time
            let datetime = new Date(x) - new Date(y)
            if (!isNaN(datetime)) return datetime;

            // Default comparison
            return x.localeCompare(y)
          }
        };

        // Iterate over all rows NOT in a thead/tfoot and sort them.
        const rows = [...table.querySelectorAll('tr:not(thead tr):not(tfoot tr)')].sort((a, b) => {
          const bool = compare(a, b, column_index);
          return bool === 0 && !isNaN(tiebreaker) ? compare(a, b, tiebreaker) : bool;
        });

        const clone_tbody = document.createElement('tbody');
        clone_tbody.append(...rows);

        const org_tbody = table.querySelector('tbody');
        if (org_tbody) {
          table.replaceChild(clone_tbody, org_tbody);
        } else {
          table.appendChild(clone_tbody);
        }

      }
      catch (error) {
        console.log(error)
      }
    });
  });
}

export { dentropize as default };
