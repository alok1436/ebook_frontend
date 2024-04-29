import React, { Component } from 'react'

export default class Menu extends Component {
  render() {
    return (
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" class="brand-link">
          {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8"> */}
          <span class="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        <div class="sidebar">
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              {/* <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"> */}
            </div>
            <div class="info">
              <a href="#" class="d-block">Alexander Pierce</a>
            </div>
          </div>
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li class="nav-item">
                    <a href="/dashboard" class="nav-link active">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Dashboard</p>
                    </a>
                  </li>
              <li class="nav-item">
                <a href="/customers" class="nav-link">
                  <i class="nav-icon fas fa-user"></i>
                  Quotation
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}
